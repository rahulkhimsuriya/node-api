const User = require('./../models/users');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// Get All User
exports.getAllUser = catchAsync(async (req, res) => {
  const users = await User.find().select('firstname lastname email');
  res.status(200).json({ success: true, results: users.length, data: users });
});

// Create New User : [For Admin]
exports.createNewUser = catchAsync(async (req, res, next) => {
  return next(new AppError('For creating user use /signup route.', 404));
});

// Get Single User
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError(`User not found with that ID`, 404));
  res.status(200).json({ success: true, data: user });
  next();
});

// Update Single User's Info : [ Not Password]
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for updating password. for updating password use /updateMyPassword',
        404
      )
    );
  }

  const { firstname, lastname, email } = req.body;
  const updateUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstname,
      lastname,
      email,
      updatedAt: Date.now()
    },
    { new: true, runValidators: true }
  );
  res.status(201).json({ success: true, data: updateUser });
});

// Update Password
exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');
  const { currentPassword, password, confirmPassword } = req.body;

  // Check For Current Passsword
  if (
    !currentPassword ||
    !(await user.comparePassword(currentPassword, user.password))
  ) {
    return next(
      new AppError('Your current password is wrong or not provided.', 404)
    );
  }

  if (!password || !confirmPassword) {
    return next(
      new AppError('Please provide us password and confirm password.', 404)
    );
  }

  // Check Both Password Same Or Not.
  if (password !== confirmPassword) {
    return next(
      new AppError('Password and Confirm password does not match.', 404)
    );
  }

  // Save Password In Database
  user.password = password;
  await user.save({ validateBeforeSave: true });
  res.status(201).json({ success: true, data: user });
});

// Delete Single User
exports.deleteUser = catchAsync(async (req, res, next) => {
  if (req.user._id == req.params.id) {
    const user = await User.findOneAndDelete(req.params.id);
    if (!user) return next(new AppError('User not found with that ID.', 404));
    return res.status(204).json({ success: true, data: null });
  } else {
    return next(new AppError("You can not delete other person's data.", 401));
  }
});

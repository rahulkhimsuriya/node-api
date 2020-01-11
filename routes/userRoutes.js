const express = require('express');
const router = express.Router();

// Controllers
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

// Signup
router.post('/signup', authController.signup);
// Login
router.post('/login', authController.login);

// Update User's Info.
router.patch('/updateMe', authController.protect, userController.updateMe);

// Update User's Password Only
router.patch(
  '/updateMyPassword',
  authController.protect,
  userController.updateMyPassword
);

// Get All User (for Both)
router.route('/').get(authController.protect, userController.getAllUser);
// Add User (for Admin)
// .post(userController.createNewUser);

router
  .route('/:id')
  // Get Single User
  .get(authController.protect, userController.getUser)
  // Update User (for Admin)
  // .patch(authController.protect, userController.updateUser)
  // Delete User (NOTE: Admin Site This Function Not Work)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;

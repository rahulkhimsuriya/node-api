const app = require('./app');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB At Default Port 27017.
const database = process.env.DATABASE;

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`MongoDB Database Connected.`))
  .catch(err => console.log(`Database ERROR: ${err}`));

// Server
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, err => {
  if (err) console.log(`ERROR: ${err}`);
  console.log(`Server listeing at port ${PORT}.`);
});

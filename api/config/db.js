const colors = require('colors/safe');
const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.info(colors.cyan.underline.bold(`MongoDB Connected to host: ${conn.connection.host}`));
};

module.exports = connectDB;

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors/safe');
const cors = require('cors');
const Order = require('./src/models/Order');
const Product = require('./src/models/Product');

const app = express();

app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
http.listen(8080, "127.0.0.1");

const errorHandler = require('./src/middleware/error');
const connectDB = require('./config/db');

// Conecta ao monogo
connectDB();


io.on("connection", socket => {
  console.log("New client connected" + socket.id);

  socket.on("orderCreate", async (data) => {
    // console.info("pedido >>>> ", data);
    // const order = await Order.create(data);

    // if (order) {
    //   socket.emit("orderCreateSuccess", order);
    // }
  });

  socket.on("orderDoing", async (data) => {
    const {
      _id
    } = data;
    let order = await Order.findById(_id);

    if (!order) {
      return next(
        new ErrorResponse(`No order with the id of ${_id}`),
        404
      );
    }

    order = await Order.findByIdAndUpdate(_id, {status: 'doing'}, {
      new: true,
      runValidators: true
    });
  });

  socket.on("pegaProdutos", async () => {
    const products = await Product.find({});

    if (products) {
      socket.emit("retornaProdutos", products);
    }
  });

  socket.on("furflesTeste", (data) => {
    console.info(data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Body parser
app.use(express.json());

// Modo desenvolvimento
const isDevelopMode = () => process.env.NODE_ENV === 'development';

const api = require('./src/routes/api');

// Montando as rotas para API
app.use('/api', api);

// Formatando mensagem de erro para toda a API
app.use(errorHandler);

// app.use(express.static("build"));

const PORT = process.env.PORT || 3001;
app.listen(
  PORT,
  console.log(
    colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
  ),
);

process.on('unhandledRejection', (err) => {
  console.log(colors.red(`Error: ${err.message}`));
  // Close server & exit process
  // server.close(() => process.exit(1));
});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const categoryRouter = require('./routes/category_route');
const productRouter = require('./routes/product_route');
const userRouter = require('./routes/user_route.js');
const api_url = '/api/v1';

const cors = require('cors');
const authJwt = require('./helpers/jwt.js');
const errorHandler = require('./helpers/error_handler.js');
app.use(cors());

//middleware
app.use(express.json());
app.use(authJwt());
app.use(errorHandler);

app.use(`${api_url}/category`,categoryRouter);
app.use(`${api_url}/product`,productRouter);
app.use(`${api_url}/user`,userRouter);



const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://aswin02:02122001@test1.f8rr9.mongodb.net/"
     );
     console.log("connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

connectDB();
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

// assign express as app
const app = express();

//data will be received in json format
// parsing json request bodies
app.use(express.json());
//cors to access external domains
app.use(cors());
//middleware function to handle requests to the '/user' path.
// userRouter contains path '/login' and '/register'
app.use("/user", userRouter);
app.use("/product", productRouter);

// connect to the database
mongoose.connect("mongodb+srv://andreansihombing83:D4v8tylJ5MhvHjSi@ecommerce.jdp7cpl.mongodb.net/ecommerce");

// app running in PORT 3001, app will print 'server started'
app.listen(3001, () => console.log("Server Started"));

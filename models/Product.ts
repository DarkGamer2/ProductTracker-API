import mongoose from "mongoose";
import { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(`${process.env.MONGO_URI}`);
const productSchema = new Schema({
  productName: String,
  productDescription: String,
  productPrice: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

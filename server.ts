import express from "express";
import { Request, Response } from "express";
import { ProductDetails } from "./interface/interface";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const Product = require("./models/Product");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/api", (req: Request, res: Response) => {
  res.send("API is working properly");
});
app.post("/api/products/addproduct", (req: Request, res: Response) => {
  const product = new Product(req.body);
  product.save();
});

app.get("/api/products", (req: Request, res: Response) => {
  Product.find((err: Error, data: ProductDetails) => {
    if (err) throw new Error(err.message);
    else {
      res.send(data);
    }
  });
});

app.get("/api/products/:id", async (req: Request, res: Response) => {
  await Product.findOne(
    { _id: req.params.id },
    (err: Error, product: ProductDetails) => {
      if (err) {
        throw new Error(err.message);
      } else {
        res.send(product);
      }
    }
  );
});
app.listen(process.env.PORT, () => {
  console.log("API is listening on port: 4000");
});

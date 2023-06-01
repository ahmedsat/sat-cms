import { config } from "dotenv"; // to load .env file
import express from "express";
import { test } from "./middleware/test.js";
import { connectDB } from "./database/connect.js";

config(); // load .env file

const app = express();
const port = process.env.PORT;

app.get("/", test, (req, res) => {
  res.send("working...");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

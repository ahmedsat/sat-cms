import { config } from "dotenv"; // to load .env file
import express from "express";
import { test } from "./middleware/test.js";
import { connectDB } from "./database/connect.js";
import { authRouter } from "./routes/auth-routes.js";

config(); // load .env file

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", test, (req, res) => {
  res.send("working...");
});
app.post("/", test, (req, res) => {
  res.send("working...");
});

app.use("/api/v1", authRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export default app;

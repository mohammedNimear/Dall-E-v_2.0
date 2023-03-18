import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import connectDB from "./mongodb/connect.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//* Middlewares
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get("/", async (req, res) => {
  res.send("Hola from DALL-E!!");
});

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8800, () =>
      console.log("server has started on port http://localhost:8800")
    );
  } catch (err) {
    console.log(err)
    res.status(500).send(err?.response.data.err.message)

  }
};

startServer();
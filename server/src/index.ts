import express from "express";
import cors from "cors";
import connectDB from "./configs/connect-database";
import apiRoutes from "./routes/api";

const app = express();

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes)

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || process.env.APP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`);
});

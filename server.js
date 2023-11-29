import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { mongooseConnection } from "./connection/mongoose.js";
import { errorStatus, pageNotFound } from "./middleware/errors.js";
import OrderRoutes from "./routes/orderRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: `${process.env.FRONTEND}`,
    // methods: 'GET,POST,PATCH,PUT,DELETE'
  })
);
app.use(morgan("tiny"));

mongooseConnection();

// your code here 
app.use('/api/users', userRouter);
app.use("/api/order", OrderRoutes);

app.use(pageNotFound);
app.use(errorStatus);

app.listen(PORT, () => console.log('server running on port', PORT));
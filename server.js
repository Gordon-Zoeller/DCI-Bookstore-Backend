import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongooseConnection } from './connection/mongoose.js';
import { errorStatus, pageNotFound } from './middleware/errors.js';
import reviewsRoutes from './routes/reviewRoutes.js';

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

mongooseConnection();

// your code here
app.use('/reviews', reviewsRoutes);

// to delete
import UserModel from './models/userSchema.js';
const addUser = async (req, res, next) => {
  const user = await UserModel.create(req.body);
  res.send(user);
};
app.post('/users', addUser);

app.use(pageNotFound);
app.use(errorStatus);

app.listen(PORT, () => console.log('server running on port', PORT));

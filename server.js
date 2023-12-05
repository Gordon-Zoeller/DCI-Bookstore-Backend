import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { mongooseConnection } from './connection/mongoose.js';
import { errorStatus, pageNotFound } from './middleware/errors.js';
import bookRoutes from './routes/bookRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { authorization } from './middleware/authorisation.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: `${process.env.FRONTEND}`,
    // methods: 'GET,POST,PATCH,PUT,DELETE'
    exposedHeaders: ['token'],
  })
);
app.use(morgan('tiny'));

mongooseConnection();

// your code here
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order', authorization, orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(pageNotFound);
app.use(errorStatus);

app.listen(PORT, () => console.log('server running on port', PORT));

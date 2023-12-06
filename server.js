import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import { mongooseConnection } from './connection/mongoose.js';
import { errorStatus, pageNotFound } from './middleware/errors.js';
import bookRoutes from './routes/bookRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { authorization } from './middleware/authorisation.js';
import { streamImage } from './controllers/imageControllers.js';

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
app.use(express.json({ limit: '100mb' })); //default limit is 2MB
app.use(fileUpload()); // handling form data
app.use(morgan('tiny'));

mongooseConnection();

// your code here
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order', authorization, orderRoutes);
app.use('/api/reviews', reviewRoutes);
// serve IMG to the frontend (automatic server-REQ):
app.get('/api/images/:filename', streamImage);

app.use(pageNotFound);
app.use(errorStatus);

app.listen(PORT, () => console.log('server running on port', PORT));

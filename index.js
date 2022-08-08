// initializing imports using es7 destructuring
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// connecting to mongoDB
// @ts-ignore
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongoDB:', err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB');
});

// middleware to parse request bodies as json
app.use(bodyParser.json());
// middleware to allow cross-origin requests
app.use(cors());

// routes for the waitlist
import waitlistRouter from './routes/waitlistRoutes.js';
app.use('/waitlist', waitlistRouter);

// starting server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
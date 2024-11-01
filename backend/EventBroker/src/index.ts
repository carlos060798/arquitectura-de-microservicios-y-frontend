import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { eventController } from './controller/eventController';
import morgan from 'morgan';
import eventRouter from './routes/routes';
const app = express();

dotenv.config();
app.use(express.json());
const port = process.env.PORT 
app.use(cors());
app.use(morgan('dev'));

app.use('/events',eventRouter);


app.listen(port, () => {
    console.log(`
    Event Broker running on port
        ${port}`);
});
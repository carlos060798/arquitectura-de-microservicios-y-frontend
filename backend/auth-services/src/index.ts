import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/Routes';
import { conectarBD } from './db/connection';
const app = express();

dotenv.config();
app.use(express.json());
const port = process.env.PORT 
conectarBD();

app.use('/users', userRouter);



app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
import express from 'express';
import dotenv from 'dotenv';
import gatewayRouter from './routes/router';
const app = express();

dotenv.config();
app.use(express.json());
const port = process.env.PORT 

app.use('/api/v1',gatewayRouter);



app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
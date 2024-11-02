/*import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import TaskRoute from './routes/routes';
import connectionDB from './db/connection';
const app = express();

dotenv.config();
app.use(express.json());
connectionDB()
const port = process.env.PORT 
app.use(cors());
app.use(morgan('dev'));

app.use('/tasks',TaskRoute);


app.listen(port, () => {
    console.log(`
    Event Broker running on port
        ${port}`);
});

*/

// index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import TaskRoute from './routes/routes';
import { connectToDatabase } from './db/connection';

dotenv.config(); // Cargar variables de entorno

// Inicializar la aplicación Express
const app = express();

// Configuración de middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Ruta para tareas
app.use('/tasks', TaskRoute);

// Puerto del servidor
const port = process.env.PORT || 3000;

// Levantar el servidor
app.listen(port, async () => {
  // Conectar a la base de datos cuando el servidor arranca
  await connectToDatabase();
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import TaskRoute from './routes/routes';
import { AppDataSource } from './db/connection';

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

// Inicializar la conexión a la base de datos y luego levantar el servidor
AppDataSource.initialize()
    .then(() => {
        console.log('Conectado a SQL Server con TypeORM');

        // Levantar el servidor después de conectar a la base de datos
        app.listen(port, () => {
            console.log(`Servidor ejecutándose en el puerto ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar con TypeORM:', error);
    });
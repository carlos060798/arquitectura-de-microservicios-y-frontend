// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import mssql from 'mssql';
import { Tarea } from './taskModel'; // Cambiado a Tarea

dotenvConfig(); // Cargar las variables de entorno

// Configuración de conexión a SQL Server para TypeORM
export const AppDataSource = new DataSource({
    type: 'mssql',
    host: process.env.DB_SERVER, // Cambiado a DB_SERVER
    port: parseInt(process.env.DB_PORT || '1433', 10),
    username: process.env.DB_USER, // Cambiado a DB_USER
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, // Cambiado a DB_NAME
    synchronize: true, // Solo en desarrollo; desactiva en producción
    logging: false,
    entities: [Tarea], // Cambiado a Tarea
    options: {
        encrypt: true, // True para Azure SQL, opcional en conexiones locales
        trustServerCertificate: true, // Para conexiones locales que confían en el certificado del servidor
    },
});

// Función para conectar a la base de datos usando mssql (si necesitas un pool separado)
export const connectToDatabase = async () => {
    try {
        const pool = await new mssql.ConnectionPool({
            server: process.env.DB_SERVER as string,
            database: process.env.DB_NAME as string,
            user: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            options: {
                encrypt: true,
                trustServerCertificate: true,
            },
        }).connect();

        console.log('Conectado a SQL Server');
        return pool;
    } catch (err) {
        console.error('Error de conexión con SQL Server:', err);
        throw err;
    }
};

// Inicializa la conexión a TypeORM
AppDataSource.initialize()
    .then(() => {
        console.log('Conectado a SQL Server con TypeORM');
    })
    .catch((error) => console.log('Error al conectar con TypeORM:', error));
  
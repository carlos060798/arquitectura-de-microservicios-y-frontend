import { config as dotenvConfig } from 'dotenv';
import mssql from 'mssql';

dotenvConfig(); // Cargar las variables de entorno

// Configuración de conexión a SQL Server
const sqlConfig: mssql.config = {
  server: process.env.DB_SERVER as string,
  database: process.env.DB_NAME as string,
  user: process.env.DB_USER as string, // Cambiado aquí
  password: process.env.DB_PASSWORD as string, // Cambiado aquí
  options: {
    encrypt: true, // True para Azure SQL, opcional en conexiones locales
    trustServerCertificate: true, // Para conexiones locales que confían en el certificado del servidor
  },
};

// Función para conectar a la base de datos
export const connectToDatabase = async () => {
  try {
    const pool = await new mssql.ConnectionPool(sqlConfig).connect();
    console.log('Conectado a SQL Server');
    return pool;
  } catch (err) {
    console.error('Error de conexión con SQL Server:', err);
    throw err;
  }
};

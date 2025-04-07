require ('dotenv').config();
import { parse } from 'url';

// Obtener la URL de la base de datos desde variables de entorno
const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error('DATABASE_URL no está definida en las variables de entorno.');
}

// Parsear la URL
const parsedUrl = parse(DB_URL);
const [user, password] = parsedUrl.auth.split(':');
const database = parsedUrl.pathname.slice(1);



module.exports = {

    db: {
      host: parsedUrl.hostname,
      user: decodeURIComponent(user), // Decodificar caracteres especiales (ej: %40 -> @)
      password: decodeURIComponent(password),
      database: database,
      port: parsedUrl.port || 3306,
      waitForConnections: true,
      connectionLimit: 10, // Ajustar según carga esperada
      queueLimit: 0,
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: true } // Usar SSL en producción
        : null,
    },
    jwt: {
      secret: process.env.JET_SECRET || 'nota secreta' 
    },
    urlStatic: {
      urlstatic: process.env.URL_STATIC  || 'http://localhost:3333/'
    },
    s3: {
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_DEFAULT_REGION,
      bucket: process.env.AWS_BUCKET_NAME
    }
  }; 
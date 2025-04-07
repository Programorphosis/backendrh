require ('dotenv').config();
const { parse } = require('url');

// Obtener la URL de la base de datos desde variables de entorno
const DB_URL = process.env.DB_RAILWAY;

if (!DB_URL) {
  throw new Error('DATABASE_URL no está definida en las variables de entorno.');
}

// Parsear la URL
const parsedUrl = parse(DB_URL);
const [user, password] = parsedUrl.auth.split(':');
const database = parsedUrl.pathname.slice(1);

console.log('DB_URL:', DB_URL);
console.log('Parsed URL:', parsedUrl);

module.exports = {



  

    db: {
      host: parsedUrl.hostname,
      user: decodeURIComponent(user), // Decodificar caracteres especiales (ej: %40 -> @)
      password: decodeURIComponent(password),
      database: database,
      port: parsedUrl.port || 3306,
   // Ajustar según carga esperada
     
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
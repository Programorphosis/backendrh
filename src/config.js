const { parse } = require('url');

let dbConfig = {};

if (process.env.DB_RAILWAY) {
  const parsedUrl = parse(process.env.DB_RAILWAY);
  const [user, password] = parsedUrl.auth.split(':');
  const database = parsedUrl.pathname.slice(1);

  dbConfig = {
    host: parsedUrl.hostname,
    user: decodeURIComponent(user),
    password: decodeURIComponent(password),
    database,
    port: parsedUrl.port,
  };
} else {
  console.warn('No se encontró la variable DB_RAILWAY, utilizando configuración local.');

  dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mi_base_local',
    port: process.env.DB_PORT || 3306,
  };
}

module.exports = {
  db: dbConfig,
  jwt: {
    secret: process.env.JET_SECRET || 'nota secreta',
  },
  urlStatic: {
    urlstatic: process.env.URL_STATIC || 'http://localhost:3333/',
  },
  s3: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_DEFAULT_REGION,
    bucket: process.env.AWS_BUCKET_NAME,
  },
};

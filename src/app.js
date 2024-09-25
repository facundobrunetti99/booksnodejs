const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
config();

const bookRoutes = require('./routes/book.routes');

const app = express();
app.use(bodyParser.json()); // Parseador de bodies

// Conectamos la base de datos
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error en la conexión de MongoDB:'));
db.once('open', () => {
    console.log('Conexión a MongoDB establecida');
});

app.use('/books', bookRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});


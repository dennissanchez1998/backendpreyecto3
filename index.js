//1.importaciones
const express = require('express');
const cors = require('cors');
const app = express();
const conectarDB = require('./config/db');
const authRoutes = require('./routes/auth');
const publicacionesRoutes = require('./routes/publicaciones');

require('dotenv').config({
    path: '.env'
})

//2.MIDDLEWARE
app.use(cors());
//a. conectarnos a la bd
conectarDB();

app.use(express.json({
    extended: true
}));

//3.RUTEO


// A. Autenticación
app.use('/api/auth', authRoutes)

// B. Publicaciones
app.use('/publicaciones', publicacionesRoutes)












//4.SERVIDOR

app.listen(process.env.PORT, () => {
    console.log("el servidor corriendo");
})
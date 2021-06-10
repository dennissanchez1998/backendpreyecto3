// To insert in "bin/seeds.js"

const mongoose = require('mongoose');
const Publicaciones = require('../models/Publicacion');

const DB_NAME = 'mercadoLibre';

mongoose.connect('mongodb://localhost:27017/mercadoLibre', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const rooms = [{
  titulo: 'pruebaaaaaaaa',
  categoria: 'Carros, Motos y Otros',
  descripcion: 'pruebaaaaaa',
  precio: 4500,
  direccion: 'cauriemate',
  imagenes: ['1', '2', '3'],
  imagen: 'esta es la imagen',
  estado: 'Nuevo'

}];



Publicaciones.create(rooms)
  .then(FromDB => {
    console.log(`Created ${FromDB.length} things`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating things from the DB: ${err}`));
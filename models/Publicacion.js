// IMPORTACIONES
const mongoose = require('mongoose')

// SCHEMA

const PublicacionSchema = mongoose.Schema({
    titulo: {
        type: String
    },
    categoria: {
        type: String,
        enum: ["Carros, Motos y Otros", 'Celulares y Teléfonos', "Animales", "Cámaras y Accesorios", "Computación", "Consolas y Videojuegos","Cosméticos","Salud y Vida","Libros","Arte"]
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number
    },
    direccion: {
        type: String
    },
    imagenes: [{
        type: String
    }],
    imagen: {
        type: String
    },
    estado: {
        type: String
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'

    }

}, {
    timestamps: true
})

// MODELO
const Publicacion = mongoose.model("Publicacion", PublicacionSchema)

// EXPORTACIÓN
module.exports = Publicacion
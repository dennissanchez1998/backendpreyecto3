// IMPORTACIONES
const mongoose = require('mongoose')

// SCHEMA

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    apellido: {
        type: String,
        trim: true,
        required: [true],
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: [true]
    },
}, {
    timestamps: true
})

// MODELO
const Usuario = mongoose.model("Usuario", UsuarioSchema)

// EXPORTACIÓN
module.exports = Usuario
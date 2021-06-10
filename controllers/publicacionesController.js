const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const {
    validationResult
} = require("express-validator");



exports.lista = async (req, res) => {



    try {
        const respuesta = await Publicacion.find({})
        console.log(respuesta);
        if (!respuesta || respuesta === '') {
            res.json({
                msg: "Actualmente no hay publicaciones"
            })

        }

        res.json({
            publicaciones: respuesta
        })
    } catch (error) {
        console.log(error);

    }

}



exports.crearPublicacion = async (req, res) => {


    // REVISION DE ERRORES CON EXPRESS-VALIDATOR
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.json({
            errores: errores.array()
        })
    }
    try {

        // CREAR UN PROYECTO A PARTIR DEL MODELO
        const publicacion = new Publicacion(req.body);
        publicacion.usuario = req.usuario.id
        publicacion.save();

        res.json({
            msg: "La publicación ha sido creada",
            publicacion: publicacion
        })
    } catch (error) {
        res.status(400).json({
            msg: "Hubo un error al crear la publicacion."
        })

    }





}


exports.detalle = async (req, res) => {

    console.log(req.params);
    const {
        id
      } = req.params;

    try {

        const respuesta = await Publicacion.findById(id).populate('usuario')
        console.log(respuesta);
        
        res.json({
            publicacion:respuesta
        })
    } catch (error) {
        console.log(error);
    }
}
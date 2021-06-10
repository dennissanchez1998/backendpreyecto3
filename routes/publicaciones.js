// 1. IMPORTACIONES
const express   = require('express')
const router    = express.Router()

const { check} = require("express-validator")
const publicacionesController = require('./../controllers/publicacionesController')

const auth = require('./../middleware/auth');






// Lista de publicaciones
// /publicaciones - GET
// (ÉL YA INICIO SESIÓN Y ME VA A MOSTRAR TOKEN)
// localhost:4000/
router.get("/", auth, publicacionesController.lista);


// Crear publicacionnnnnnnn
// /publicaciones - POST
// localhost:4000/crear
router.post("/crear", [
     // checks si son true, avanzan, si son false, ejecutan el mensaje de error
    check("titulo", "Ingrese un Titulo").not().isEmpty(),
    check("categoria", "Ingrese una Categoría").not().isEmpty(),
    check("descripcion", "Ingrese una Descripción").not().isEmpty(),
    check("precio", "Ingrese un Precio").not().isEmpty(),
    check("direccion", "Ingrese una Dirección valida").not().isEmpty(),
    check("estado", "Ingrese un Estado").not().isEmpty(),
    
    
    
    
], auth, publicacionesController.crearPublicacion);

// Detalle de publicacion
// /publicaciones - GET
// (ÉL YA INICIO SESIÓN Y ME VA A MOSTRAR TOKEN)
// localhost:4000/:id
router.get("/:id", auth, publicacionesController.detalle);





module.exports = router
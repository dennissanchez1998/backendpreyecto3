// 1. IMPORTACIONES
const express   = require('express')
const router    = express.Router()

const { check, validationResult } = require("express-validator")
const authController = require('./../controllers/authController')

const auth = require('./../middleware/auth');


// RUTAS
// CREAR UN USUARIO
// localhost:4000/api/auth/register
router.post("/register",
    [
        // checks si son true, avanzan, si son false, ejecutan el mensaje de error
        check("nombre", "El nombre es obligatorio").not().isEmpty(),   
        check("telefono", "El telefono es obligatorio").not().isEmpty(),
        check("apellido", "El apellido es obligatorio").not().isEmpty(),  
        check("email", "Agrega un email válido").isEmail(),
        check("password", "El password debe tener mínimo de 6 caracteres").isLength({ min: 6 })
    ]
    , authController.crearUsuario);

// Hacer Login al usuario
// localhost:4000/api/auth/login
router.post("/login",  [
    // checks si son true, avanzan, si son false, ejecutan el mensaje de error
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe tener mínimo de 6 caracteres").isLength({ min: 6 })
], authController.login)



// VERIFICAR USUARIO
// api/auth - GET
// (ÉL YA INICIO SESIÓN Y ME VA A MOSTRAR TOKEN)
// localhost:4000/api/auth
router.get("/", auth, authController.verificarUsuario)





module.exports = router
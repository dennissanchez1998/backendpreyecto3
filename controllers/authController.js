const {
    validationResult
} = require("express-validator");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');




exports.crearUsuario = async (req, res) => {

    console.log("llego al crear Uusario");


    // REVISION DE ERRORES CON EXPRESS-VALIDATOR
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.json({
            errores: errores.array()
        })
    }


    // EXTRAER NOMBRE, EMAIL Y PASSWORD DEL REQ
    const {
        email,
        password,
        nombre
    } = req.body


    // BUSCAR EN BASE DE DATOS SI EXISTE EL USUARIO

    try {

        let usuario = await Usuario.findOne({
            email
        });

        if (usuario) {

            return res.status(400).json({
                msg: "el correo ingresado ya esta registrado"
            })

        }
        console.log("paso la validacion de registrar usuario");

        //Si no se encuentra el usuario a la bd se crea 
        usuario = new Usuario(req.body);

        //Encriptamos el password

        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);


        // GUARDARMOS EL USUARIO
        await usuario.save()


        console.log("ya se guardo el usuario en la bd");



        // CREACIÓN DE PAYLOAD PARA EL JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        // GENERAR EL JWT Y APLICARLE UNA FIRMA
        console.log(process.env.SECRETA);
        jwt.sign(
            payload, // LOS DATOS QUE SE ENVÍAN AL FRONT (USUARIO.ID) 
            process.env.SECRETA, // PALABRA SECRETA DEL BACKEND
            {
                expiresIn: 360000 // EXPIRACIÓN 100 HORAS
            },
            (error, token) => { // CALLBACK UNA VEZ QUE EJECUTÓ TODO LO DE ARRIBA (sign con el payload, la palabra secreta y la expiración)
                if (error) throw error

                // DEVOLVER RESULTADO AL FRONTEND
                res.json({
                    token: token
                })
            }
        )

    } catch (error) {

    }
}


exports.login = async (req, res) => {

    // REVISION DE ERRORES CON EXPRESS-VALIDATOR
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.json({
            errores: errores.array()
        })
    }

    // EXTRAER NOMBRE, EMAIL Y PASSWORD DEL REQ
    const {
        email,
        password,

    } = req.body


    try {

        // ENCONTRAR AL USUARIO EN BD
        let usuarioBD = await Usuario.findOne({
            email
        })

        // EN CASO DE QUE NO ENCONTREMOS AL USUARIO
        if (!usuarioBD) {
            return res.status(400).json({
                msg: "El usuario no existe."
            })
        }


        // REVISAR EL PASSWORD Y CONFIRMAR QUE ES EL PASSWORD CORRECTO
        let passwordCorrecto = await bcryptjs.compare(password, usuarioBD.password)



        if (!passwordCorrecto) {
            return res.status(400).json({
                msg: "Password incorrecto. Intenta nuevamente."
            })
        }


        // CREAR EL PAYLOAD
        const payload = {
            usuario: {
                id: usuarioBD.id
            }
        }



        // CREAR EL JWT
        jwt.sign(
            payload,
            process.env.SECRETA, {
                expiresIn: 360000 // EXPIRACIÓN 100 HORAS
            },
            (error, token) => {

                if (error) throw error

                // TRIUNFAMOS. DEVOLVAMOS EL TOKEN HACIA EL CLIENTE (POSTMAN O CHROME)
                res.json({
                    token
                })
            }
        )

    } catch (error) {

    }



}


exports.verificarUsuario = async(req, res) => {

    const userId = req.usuario.id;

    try{
        let usuario = await Usuario.findById(userId).select('-password')
        res.json({
            usuario
        })

    }catch(e){
        res.status(400).json({
            msg: "Hubo un error en el servidor."
        })
    }
}

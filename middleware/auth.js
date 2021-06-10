const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {

    // RECIBIR EL TOKEN DEL FRONT (INSERTADO EN EL HEADER CON LOCALSTORAGE)
    const token = req.header('x-auth-token')
    
    // REVISAR SI NO HAY TOKEN
    if(!token){
        return res.status(400).json({
            msg: "No hay token, permiso no válido."
        })
    }

    // SI SÍ HAY TOKEN, VALIDA EL TOKEN
    try{
        const verificacionCifrado = await jwt.verify(token, process.env.SECRETA) // VERIFICAR EL TOKEN Y ABRIRLO CON LA LLAVE SECRETA DEL BACKEND
        req.usuario = verificacionCifrado.usuario
        next()

    }catch(e){
        res.status(400).json({
            msg: "Hubo una falla con el token."
        })
    }
}


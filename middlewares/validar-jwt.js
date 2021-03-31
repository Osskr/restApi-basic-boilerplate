const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')


const validarJWT = async ( req, res, next) =>{

    //leer tokens de los headers
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }

    try {
        //verifica el jwt
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        //este lo voy a extraer en el controller del usuarios delete
        req.uid = uid;
        
        const usuario = await Usuario.findById(uid)

        //Usuario existe? 

        if(!usuario){
            return res.status(401).json({
                msg:'token no valido - usuario no existe en bd'
            })
        }
        
        // Usuario que se quiere loggear esta borrado?
        if(!usuario.estado){
            return res.status(401).json({
                msg:'token no valido - usuario estado false'
            })
        }
        req.usuario = usuario;
        next()
    
    }catch (error) {
        console.log(error)
        res.status(401).json({
            msg:"Token Invalido"
        })
    }
 
}

module.exports = {
    validarJWT
}
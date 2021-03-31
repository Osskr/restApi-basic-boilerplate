const Usuario = require('../models/usuario')

const esAdminRole =(req,res,next) => {

    //puedo usar directamente req.usuario porque anteriormente estoy obteniendo el usuario
    //cuando hago la validacion del JWT (ver userRoutes router.delete)
    if(!req.usuario){
        return res.status(500).json({
            msg: 'se quiere verificar el rol sin validar el token primero'
        })
    }

    const {rol, nombre} = req.usuario
    
    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:'El rol no es administrador'
        })
    }
   
    next()
}

const tieneRole = (...roles) => {
   
    return (req, res, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'se quiere verificar el rol sin validar el token primero'
            })
        }
        
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `se requieren alguno de estos roles, ${roles} para realizar la accion`
            })
        }
        
         next()
    }
}


module.exports= {
    esAdminRole,
    tieneRole
}
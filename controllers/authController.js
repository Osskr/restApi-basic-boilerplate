const Usuario = require('../models/usuario')
const bcryptjs =  require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const loginPost = async (req,res)=>{

    const {email, password} = req.body;
    
        const usuario = await Usuario.findOne({email})
        
        
      
    try {
        //verificar si el email existe
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/Password incorectos - correo'
            })
        }
        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario/Password incorectos - estado:false'
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/Password incorectos - password'
            })
        }
        //generar JWT
        const token = await generarJWT(usuario.id)



        res.json({
                usuario,
                token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'algo salio mal hable con el admin'
        }) 
    }
    
}

module.exports ={
    loginPost
}
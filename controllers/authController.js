const Usuario = require('../models/usuario')
const bcryptjs =  require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');


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


const googlePost = async (req,res)=> {

    const {id_token} = req.body
    
    try {
        const {nombre,img,email} = await googleVerify(id_token)
       
        //Verificamos si el usuario ya existe en la BD
        let usuario = await Usuario.findOne({email})

        if(!usuario){
            // tengo que crear el usuario si el email no existe
            const data = {
                nombre,
                email,
                password:':P',
                img,
                google:true
            }
            //creamos el usuario con la data de google
            usuario = new Usuario (data)
            await usuario.save()
        }

        // Si el usuario en DB tiene estado false
        if(!usuario.estado) {
            return res.status(401).json({
                msg:'Hable con el admin usuario bloqueado'
            })
        }

        //generar JWT
        const token = await generarJWT(usuario.id)
        
        res.json({
          usuario,
          token
        })
    
    }catch (error){
        res.status(400).json({
            msg:'Token de Google no es valido'
        })
    }
}
module.exports ={
    loginPost,
    googlePost
}
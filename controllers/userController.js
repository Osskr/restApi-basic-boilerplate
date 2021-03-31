const {response} = require('express')// es para que vscode reconozca a req y res
const bcryptjs = require('bcryptjs')

//para guardar en la BD importamos el modelo
const Usuario = require('../models/usuario');


const usuariosGet = async(req,res = response) => {
    //obtener query params
    const {limite = 5, desde=0, hasta=5} = req.query
    
   
    //Promise.all me permite enviar un arreglo con todas las promesas que quiero que se ejecuten
    // la respuesta va a ser una coleccion de promesas
    //La ventaja es que va ejecutar las promesas de manera simultanea
    //si una da error todas dan error
    //esto es mucho mas rapido que esperar que se resuelva una promesa y luego enviar 
    // la otra y esperar que se resuelva
    const [total,usuarios]= await Promise.all([
        
        //devolver numero total de usuarios
        Usuario.countDocuments({estado:true}),
        //Get todos los usuarios,  
        //limit() estamos limitando la cantidad de registros
        //skip()  devuelve desde un determinado registro
        Usuario
        .find({estado:true})
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
       total,
       usuarios
    })
}


const usuariosPost = async (req, res=response) => {

    const {nombre, email, password, rol} = req.body; // aca viene la data por post

    //los post usualmente envian la data por el body
    const usuario = new Usuario({nombre,email,password,rol});// desestructuramos los argunentos recibidos en el body a ntro usuario

          
    // Encriptar la Contraseña
        //salt indica el nivel de complejidad de encriptacion recomendado 10
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password,salt)


    //debemos insertar el usuario en la base de datos en este caso mongo
    await usuario.save() //esperamos que agregue el usuario 
    res.status(201).json({
        usuario
    })
   
}

const usuariosPut = async (req, res=response) =>{

    //para obtener parametros de segmento
    const id = req.params.id
   // desestructuramos los argunentos recibidos en el request de la peticion
    const {_id, password,google,correo, ...resto} = req.body //extraigo lo que no necesito
    
    //TODO validar contra base de datos
    //si tenemos password significa que intenta modificarlo
    if(password){
        //por  tenemos que encriptar el nuevo password
        const salt = bcryptjs.genSaltSync()
        //cambiamos el password viejo por el nuevo
        resto.password = bcryptjs.hashSync(password,salt)
    }

    //actualizamos el registro 
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
   
    res.status(200).json({
         usuario
    })
}

const usuariosDelete = async (req, res=response) =>{

    const id = req.params.id

    //Borramos fisicamente (no recomendado porque perdemos la integridad referencial )
   /// const usuario = await Usuario.findByIdAndDelete(id)

   //Borrado logico (recomendado)
   //para cualquiera que este consumiendo el backend ese usuario estara eliminado, pero
   //se mantiene en nuestra base de datos para mantener la integridad referencial de la misma
   const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
    res.json({
         usuario
    })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
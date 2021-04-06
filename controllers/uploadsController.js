
const { subirArchivo, coleccionesPermitidas } = require("../helpers");
const { Usuario, Producto } = require("../models");
const fs = require('fs')

const path = require('path')

const cloudinary = require('cloudinary').v2
//configuramos cuenta cloudinary
cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivo = async (req,res)=>{

    
    try {
      
        const filename = await subirArchivo(req.files,undefined,'imgs')
        res.json({
          filename
        })

    } catch (error) {
      
      res.status(400).json({
        error
      })
    }

   
}

//solo para fines didacticos dsp uso cloudinary
const actualizarImagen = async(req,res)=>{

  const {id,coleccion} = req.params
  
  let modelo;


  switch(coleccion){
    
    case 'usuarios':
      //verifico el id
      modelo = await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({
          err: `no existe usuario con id:  ${id}`
        })
      }
    break

    case 'productos':
      //verifico el id
      modelo = await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({
          err: `no existe producto con id:  ${id}`
        })
      }
      break
      
      default:
        return res.status(500).json({
          msg:'todavia no validado'
        })

  }

  // Limpiar imagenes previas
  
  if(modelo.img){
    //hay que borrar imagen del servidor
    //construyo el path de la imagen a borrar
    const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img)
    // me fijo que exista el archivo fisicamente
    if(fs.existsSync(pathImagen)){
      //si existe la borro con unlinkSync
      fs.unlinkSync(pathImagen)
    }
  
  }

  // aca subo el archivo y como la promise va a resolverse con la ruta donde se guarda 
  //entonces eso lo guardo en el modelo de la base de datos ya sea del producto o el usuario
  const nombre = await subirArchivo(req.files,undefined,coleccion)
  modelo.img = nombre
  
  //salvo el modelo actualizado

  await modelo.save()

  res.json({modelo })

}


const mostrarImagen = async (req,res) => {

  const {id,coleccion} = req.params
  
  let modelo;


  switch(coleccion){
    
    case 'usuarios':
      //verifico el id
      modelo = await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({
          err: `no existe usuario con id:  ${id}`
        })
      }
    break

    case 'productos':
      //verifico el id
      modelo = await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({
          err: `no existe producto con id:  ${id}`
        })
      }
      break
      
      default:
        return res.status(500).json({
          msg:'todavia no validado'
        })

  }

  // Limpiar imagenes previas
  
  if(modelo.img){
    //hay que borrar imagen del servidor
    //construyo el path de la imagen a borrar
    const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img)
    // me fijo que exista el archivo fisicamente
    if(fs.existsSync(pathImagen)){
      //si existe sirvo la imagen
      return res.sendFile(pathImagen)
    }
  
  }

  //si no hay imagenes servimos el placeholder
  const placeholder = path.join(__dirname,'../assets/no-image.jpg',)
  res.sendFile(placeholder )
}



const actualizarImagenCloudinary = async(req,res)=>{

  const {id,coleccion} = req.params
  
  let modelo;


  switch(coleccion){
    
    case 'usuarios':
      //verifico el id
      modelo = await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({
          err: `no existe usuario con id:  ${id}`
        })
      }
    break

    case 'productos':
      //verifico el id
      modelo = await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({
          err: `no existe producto con id:  ${id}`
        })
      }
      break
      
      default:
        return res.status(500).json({
          msg:'todavia no validado'
        })

  }

  // Limpiar imagenes previas
  
  if(modelo.img){
    
    //todo esto es para extraer el id de cloudinary para eliminar la imagen
    const nombreArr = modelo.img.split('/')
    const nombre = nombreArr[nombreArr.length-1]
    const [public_id] = nombre.split('.')
    

    //eliminanos la imagen
    cloudinary.uploader.destroy(public_id)
  
  }

  //subimos a cloudinary
    //necesitamos el path temporal donde se guarda el archivo
    //esto viene en la req
    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)//esto devuelve una promesa

     modelo.img = secure_url
  
    //salvo el modelo actualizado

    await modelo.save()

  res.json(secure_url)

}




module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}




const {response} = require('express')
const {ObjectId} = require('mongoose').Types;
const {Usuario, Categoria, Producto} = require('../models')

// aca vamos a definir las colecciones donde se pude buscar
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
]


const buscarUsuarios = async(termino = '', res = response)=>{
    // si es valido tiene que ser un mongo ID entonces busco por id
    // si no es valido entonces e un termino, entonces busco por termino 
    const esMongoId =  ObjectId.isValid(termino)

    if(esMongoId){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results:(usuario)? [usuario] : []
        })
    }
    //esta expresion me permite generar las busquedad case insensitive
    const regex = new RegExp(termino,'i')

    //en el termino me puede mandar el nombre o el correo
    //podemos usar condicionales en el find $or
    const usuarios = await Usuario.find({
        $or: [{nombre:regex}, {email:regex}],
        $and:[{estado:true}]
    })

    res.json({
        results:usuarios
    })
}




const buscarCategorias = async(termino = '', res = response)=>{
    // si es valido tiene que ser un mongo ID entonces busco por id
    // si no es valido entonces e un termino, entonces busco por termino 
    const esMongoId =  ObjectId.isValid(termino)

    if(esMongoId){
        const categoria = await Categoria.findById(termino)
        return res.json({
            results:(categoria)? [categoria] : []
        })
    }
    //esta expresion me permite generar las busquedad case insensitive
    const regex = new RegExp(termino,'i')

    //en el termino me puede mandar el nombre o el correo
    //podemos usar condicionales en el find $or
    const categoria = await Categoria.find({
        $or: [{nombre:regex}],
        $and:[{estado:true}]
    })

    res.json({
        results:categoria
    })
}

const buscarProductos = async(termino = '', res = response)=>{
    // si es valido tiene que ser un mongo ID entonces busco por id
    // si no es valido entonces e un termino, entonces busco por termino 
    const esMongoId =  ObjectId.isValid(termino)

    if(esMongoId){
        const producto = await Producto.findById(termino).populate('categoria','nombre')
        return res.json({
            results:(producto)? [producto] : []
        })
    }
    //esta expresion me permite generar las busquedad case insensitive
    const regex = new RegExp(termino,'i')

    //en el termino me puede mandar el nombre o el correo
    //podemos usar condicionales en el find $or
    const producto = await Producto.find({nombre:regex ,estado:true}).populate('categoria','nombre')

    res.json({
        results:producto
    })
}


const buscar = (req,res)=>{

    const {coleccion, termino} = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`colecciones permitidas: [${coleccionesPermitidas}]`
        })
    }

       
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
            
            break;
        case 'categorias':
            buscarCategorias(termino,res)
            
            break;
        case 'productos':
                buscarProductos(termino,res)
            break;
        
        default:
           res.status(500).json({
               msg:"sorry todavia no disponible"
           })
    }
   
}

module.exports = {
    buscar
}
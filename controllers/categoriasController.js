
const {Categoria} = require("../models")



const obtenerCategorias = async (req,res) =>{

    const {limite=5, desde=0} = req.query

    const [total, categorias] = await Promise.all([
        //devolvemos el total de categorias
        Categoria.countDocuments({estado:true}),

        Categoria
            .find({estado:true})
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ])
    res.json({
        total,
        categorias
    })
}


//obtener categorias - populate{}
const obtenerCategoriaPorId = async (req,res) =>{

    const id = req.params.id

    const categoria = await Categoria.findById(id).populate('usuario','nombre')
    
        
       if(!categoria || !categoria.estado){
            return res.status(401).json({
                msg:"no existe la categoria"
            })
        }
            res.json({
            categoria
        })

}

const crearCategoria = async (req,res) =>{
    //extraigo el nombre directamente en una variable porque ya se que viene
    //al validad que sea obligatorio

   
    const nombre = req.body.nombre.toUpperCase()
    
    //chequeamos que no exista una categoria con el mismo nombre
    const categoriaDB = await Categoria.findOne({nombre})
    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre}, ya existe`
        })
    } 

    //generar la data a guardar no puedo permitir que envien en la peticion cosas
    //como id o estado por seguridad
    const data  = {
        nombre,
        usuario:req.usuario._id
    }
    

    const categoria = new Categoria(data)
    //guardar DB
    await categoria.save()
    
    res.status(201).json({
       categoria
    })
}
// Actualizar Categoria
const actualizarCategoria = async (req,res) =>{

    const {id }= req.params
    const {estado,usuario, ...data} = req.body  //extraigo lo que no quiero que sea modificado
    
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id //actualizo el usuario

    const categoria =  await Categoria.findByIdAndUpdate(id, data, {new:true}).populate('usuario','nombre')
    //new:true devuelve el documento actualizado
    res.json({
        categoria
    })
}


//Eliminar Categoria
const eliminarCategoria = async (req,res) =>{

    const id = req.params.id

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false})
    
    res.json({
        categoria
    })
}

module.exports= {
        obtenerCategorias,
        obtenerCategoriaPorId,
        crearCategoria,
        actualizarCategoria,
        eliminarCategoria
}
const {Usuario, Categoria,Producto} = require('../models')

const obtenerProductos = async(req,res)=>{

    const {limite=5, desde=0} = req.query

    const [total, productos] = await Promise.all([
        //devolvemos el total de categorias
        Producto.countDocuments({estado:true}),

        Producto
            .find({estado:true})
            .populate('usuario', 'nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ])
    res.json({
        total,
        productos
    })
}
const obtenerProductosPorId = async(req,res)=>{

    const id = req.params.id

    const producto = await Producto.findById(id)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        
        if(!producto || !producto.estado){
            return res.status(401).json({
                error : "no existe el Producto"
            })
        }

        
    res.json({
         producto
    })
}
const crearProducto = async (req,res)=>{

    const{estado, usuario, nombre,precio=0, descripcion=''}= req.body
    
    const nombreProducto = nombre.toUpperCase()
    const categoria = req.body.categoria.toUpperCase()
    //chequeo que exista la categoria 

    const categoriaDB = await Categoria.findOne({nombre:categoria})
    if(!categoriaDB){
        return res.status(400).json({
            error: `La categoria ${categoria} no existe`
        })
    }

    const productoDB = await Producto.findOne({nombre:nombreProducto})
    if(productoDB){
        return res.status(400).json({
            error:`El ¨Producto: ${productoDB.nombre} ya existe`
        })
    }

    const data = {
        nombre:nombreProducto,
        categoria: categoriaDB._id,
        usuario:req.usuario._id,
        precio,
        descripcion,
    }

    const producto = new Producto(data)
    //guardar en la db
    await producto.save()
    res.json({
       producto
    })
}
const actualizarProducto = async(req,res)=>{

    const {id} = req.params
    const {estado, usuario, ...data} = req.body  //extraigo lo que no quiero que sea modificado
    
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

     
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true})
                            .populate('usuario','nombre')
                            .populate('categoria','nombre')
    
    res.json({
       producto
    })
}
const eliminarProducto = async(req,res)=>{

    const id = req.params.id
    const producto = await Producto.findByIdAndUpdate(id, {estado:false})
    res.json({
        producto
    })
}


module.exports ={
    obtenerProductos,
    obtenerProductosPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}
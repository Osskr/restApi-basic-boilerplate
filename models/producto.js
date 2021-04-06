const {Schema, model} = require('mongoose')

const ProductoSchema = Schema({

    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{// este es el usuario que crea la Producto
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    precio:{
        type:Number,
        default:0
    
    },
    categoria:{// este es la categoria del producto
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    descripcion:{
        type:String,
    },
    disponible:{
        type:Boolean,
        default:true
    },
    img:{
        type:String,
    }


})

ProductoSchema.methods.toJSON = function(){
    //extraigo la __v y el password por separado (despues extraigo los campos restantes en
    // ...usuario ). por ultimo solo retorno usuario sin los campos password y __V
    const {__v,estado, ...producto} = this.toObject();
    
    return producto;
}
module.exports = model('Producto',ProductoSchema)

//
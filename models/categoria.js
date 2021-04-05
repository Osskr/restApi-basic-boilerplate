const {Schema, model} = require('mongoose')

const CategoriaSchema = Schema({

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
    usuario:{// este es el usuario que crea la categoria
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }

})

CategoriaSchema.methods.toJSON = function(){
    //extraigo la __v y el password por separado (despues extraigo los campos restantes en
    // ...usuario ). por ultimo solo retorno usuario sin los campos password y __V
    const {__v,estado, ...categoria} = this.toObject();
    
    return categoria;
}
module.exports = model('Categoria',CategoriaSchema)

//
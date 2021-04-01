//Modelo de usuario
// {
//     nombre:'',
//     correo:'asda@asdasd.com',
//     password:'adasdasd1312asd',
//     img:'url-img',
//     rol:'sadfsdfasdfs12312',
//     estado:true,
//     google:true;
// }

const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const UsuarioSchema = Schema({
    nombre: {
        type:String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'El correo es necesario']
    },
    password: {
        type:String,
        required:[true, 'La contraseña es obligatoria'],
    },
    img:{
        type:String
    },
    rol:{
        type: String,
        default:'USER_ROLE',
        required: true,
        //enum: ['ADMIN_ROLE', 'USER_ROLE'] //valida que el rol sea uno de esos 2
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{ 
        type:Boolean,
        default:false
    }

    
})
//Esto sirve para que no envie la contraseña cuando responde a la peticion post
// de lo contrario se veria el hash con la contraseña encriptada
//el function() es para mantener el contexto cuando usamos this 
UsuarioSchema.methods.toJSON = function(){
    //extraigo la __v y el password por separado (despues extraigo los campos restantes en
    // ...usuario ). por ultimo solo retorno usuario sin los campos password y __V
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid= _id
    return usuario;
}

//esto sirve para que funcion la valicion del campo unique del email
UsuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})
module.exports = model('Usuario', UsuarioSchema); 
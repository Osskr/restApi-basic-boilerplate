// Contiene validadores para nuestros campos de bd

const Role = require("../models/role")
const Usuario = require('../models/usuario')

//rol

const esRoleValido = async (rol='') => {

    const existeRol = await Role.findOne({ rol })
    if(!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la Base de datos`)
    }
}



//Email unico 
const emailExiste = async (email = '' ) => {
    // verificar si el correo existe 
        //lanza un error si el correo ya existe, no tiene que ver con la validacion
        //(moongoose unique) hecha en el modelo de usuarios.
        const existeEmail = await Usuario.findOne({email})
        if(existeEmail){
            throw new Error(`El email ${email} ya esta siendo utilizado`)
            
        }
       
}

//Verificar si existe un usuario por un id determinado

const existeUsuarioPorId = async (id) =>{

    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error( `El usuario con el id: ${id} no existe`)
    }
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}



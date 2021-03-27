const {response} = require('express')// es para que vscode reconozca a req y res


const usuariosGet = (req,res = response) => {
    //obtener query params
    const {id,lang,nombre="no-name"} = req.query;
    res.json({
        msg:'Get Api Controller',
        id,
        lang,
        nombre
    })
}


const usuariosPost = (req, res=response) =>{

    const body = req.body; // aca viene la data por post
    const {nombre, edad, perritos} = req.body //podemos desestructurar lo que necesitamos

    res.status(201).json({
        message:'posted API Controller',
        nombre,
        edad,
        perritos
    })
}

const usuariosPut = (req, res=response) =>{

    //para obtener parametros de segmento
    const id = req.params.id
    res.status(400).json({
        message:'put API Controller',
        id
    })
}

const usuariosDelete = (req, res=response) =>{
    res.json({
        message:'delete API Controller'
    })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
const validaCampos = require('../middlewares/validar-campos')
const validaJWT = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validar-roles')
const validaArchivo = require('../middlewares/validar-archivo')

//todo lo que exporten esas funciones lo voy a exportar con el ...
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validaArchivo
    
}
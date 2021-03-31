const validaCampos = require('../middlewares/validar-campos')
const validaJWT = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validar-roles')


//todo lo que exporten esas funciones lo voy a exportar con el ...
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}
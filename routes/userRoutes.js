const {Router} = require('express')
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete  } = require('../controllers/userController')


const router = Router()
const {check, validationResult} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')

//router.post('/route', [middlewares], controller)
//router.post('/route',controller)

router.get('/',usuariosGet)
// :id es para los parametros de segmento
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido),
    validarCampos ],
    usuariosPut)

router.post('/',[
    check('nombre','El nombre es  obligatorio').not().isEmpty(),
    check('password','El largo del password deben ser 6 caracteres como minimo').isLength({min:6}),
    check('email','El correo no es valido').isEmail(),
    //valida que el mail exista ver funcion en db-validators
    check('email').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //validamos el rol desde la BD
    check('rol').custom( esRoleValido),
    validarCampos],usuariosPost)

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)


module.exports = router;
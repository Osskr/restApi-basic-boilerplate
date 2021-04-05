const {Router} = require('express')
const {check} = require('express-validator')

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete  } = require('../controllers/userController')


const {validarCampos,
       validarJWT,
       esAdminRole,
       tieneRole} = require('../middlewares')
            
       
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')

const router = Router()


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


    //para proteger una ruta debemos usar un middleware personalizado
    //en este caso ValidarJWT
router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)


module.exports = router;
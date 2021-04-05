const {Router} = require('express')
const {check} = require('express-validator')

const { obtenerProductos,
    obtenerProductosPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto} = require('../controllers/productosControllers')
const { validarCampos, esAdminRole } = require('../middlewares')
const{ existeProducto, existeUsuarioPorId} = require('../helpers/db-validators')

const {validarJWT} = require('../middlewares/validar-jwt')
const router = Router()

// Obtener todos los productos - publico - total - populate -paginado 
router.get('/', obtenerProductos)
    
// obtener todos un producto por id
router.get('/:id',[
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProductosPorId)
    
//Crear Productos
router.post('/', [
    validarJWT,
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    validarCampos],crearProducto)


router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un producto valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un producto valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], eliminarProducto)



module.exports = router
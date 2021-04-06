const {Router} = require('express')
const {check} = require('express-validator')

const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploadsController')
const { coleccionesPermitidas } = require('../helpers')
const { validarCampos , validarArchivo } = require('../middlewares')



const router = Router()

router.post('/',validarArchivo,cargarArchivo)



router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','No es un id valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos], actualizarImagenCloudinary)

router.get('/:coleccion/:id',[check('id','No es un id valido').isMongoId(),
check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
validarCampos],mostrarImagen)

mostrarImagen
module.exports = router;





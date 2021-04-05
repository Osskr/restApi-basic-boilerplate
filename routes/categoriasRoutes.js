const {Router} = require('express')
const {check} = require('express-validator')


const { obtenerCategorias,
        obtenerCategoriaPorId,
        crearCategoria,
        actualizarCategoria,
        eliminarCategoria} = require('../controllers/categoriasController')
const { existeCategoria } = require('../helpers/db-validators')

const {validarCampos, validarJWT, esAdminRole } = require('../middlewares')

const router = Router()

//obtener todas las categorias - publico - total- populate
router.get('/',obtenerCategorias)

//obtener una categoria por id - publico
router.get('/:id',[
check('id', 'No es un ID válido').isMongoId(),
check('id').custom(existeCategoria),
validarCampos],obtenerCategoriaPorId)

// post Crear una nueva categoria - privado cualuiquier rol, token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//put actualizar registro por :id - privado con token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es una categoria Válida').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos

],actualizarCategoria)

// Delete Categoria - Admin - privado
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es una categoria Válida').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],
    eliminarCategoria)

module.exports = router

//implementar middleware personalizado existeCategoria en dbValidators
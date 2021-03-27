const {Router} = require('express')
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete  } = require('../controllers/userController')


const router = Router()



router.get('/',usuariosGet)
// :id es para los parametros de segmento
router.put('/:id',usuariosPut)
router.post('/',usuariosPost)
router.delete('/', usuariosDelete)


module.exports = router;
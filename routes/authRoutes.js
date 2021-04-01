const Router = require('express')
const {loginPost, googlePost} = require("../controllers/authController")
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router()


router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],loginPost)



router.post('/google',[
    check('id_token','El Id token es necesario').not().isEmpty(),
    validarCampos
],googlePost)


module.exports = router
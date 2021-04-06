

const validarArchivo = (req, res, next) => {
   
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: "No hay archivo para subir" });
        return;
      }
      
      next()
      //esto es porque quiero que venga el nombre archivo en la req
    //   !req.files.archivo
}

module.exports = {validarArchivo}
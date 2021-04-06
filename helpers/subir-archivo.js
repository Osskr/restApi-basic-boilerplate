const path = require('path')
const {v4: uuidv4} = require('uuid')

const subirArchivo = (  files,
                        extensionesValidas= ["png", "jpg", "jpeg", "gif"],
                        carpeta='') => {

    return new Promise((resolve,reject)=>{

        const { archivo } = files;

        const nombreCortado = archivo.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1];

        
        //validar la extension
        if (!extensionesValidas.includes(extension)) {
            
            return reject( `la extension ${extension} no es permitida, only: ${extensionesValidas}`)
              
        }

       

        const nombreTemp = uuidv4() + "." + extension;
        const uploadPath = path.join(__dirname, "../uploads/",carpeta, nombreTemp);

        //si hay un error devuelve un callback con el 500
        archivo.mv(uploadPath, function (err) {
          if (err) {
            reject(err)
          }

          resolve(nombreTemp)
          
        });
    })
    
}

module.exports = {
    subirArchivo
}
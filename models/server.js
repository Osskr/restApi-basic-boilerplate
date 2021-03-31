const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config.db')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

        //Conectar a la base de datos
        this.conectarDB()        
        //Middlewares
        this.middlewares()

        //Rutas de mi app
        this.routes()
    }

    
    async conectarDB(){
        await dbConnection()
    }   

    middlewares(){
        //Cors
        // Posiblemente vamos a querer que ciertas paginas puedan acceder a nuestro API
        //Cors nos sirve para ayudarnos a configurar esto, proteger nuestro servidor,
        //Muchos navegadores nos van a dar error si nuestro cors no esta habilitado cross origin access error
        this.app.use(cors())
        
        //Lectura y Parseo del Body leer los datos que vienen por post
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))

        
        
    }

    routes() {
        //Usamos las rutas definias en userRoutes
        this.app.use(this.authPath, require('../routes/authRoutes'))
        this.app.use(this.usuariosPath, require('../routes/userRoutes'))
    }

    listen(message = 'running at: '){
        this.app.listen(this.port, ()=> {
            console.log(message, this.port)
        })
    }
}

module.exports = Server;
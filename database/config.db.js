const mongoose = require('mongoose')

const dbConnection = async()=>{

    try {
        
        //conexion a mongo

       await mongoose.connect(process.env.MONGO_CNN,{
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex:true,
           useFindAndModify:false
        })

        console.log('Base de datos online')

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar la base de datos')
    }

}

module.exports = {
    dbConnection
}
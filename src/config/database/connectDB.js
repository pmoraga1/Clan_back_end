const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
   
    console.log('conectado a la base de datos')
}

module.exports = {connectDB}





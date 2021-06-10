const mongoose = require('mongoose');
const conectarDB = async () => {
    
    try {
        await mongoose.connect(process.env.DB || `mongodb://localhost:27017/mercadoLibre`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
            
        })

        console.log("base de datos conectada");
    } catch (error) {
        console.log(error);
        process.exit(1);//detener la app
        
        
    }
    
}


module.exports = conectarDB;
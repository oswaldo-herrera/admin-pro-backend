const mongoose = require('mongoose');


//useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true



const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD ver logs');
    }

}


module.exports = {
    dbConnection
}
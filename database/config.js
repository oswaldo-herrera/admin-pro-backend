const mongoose = require('mongoose');


//useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true   password:  ZjJ20Zvqrsk9st61  samuel-mongo



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
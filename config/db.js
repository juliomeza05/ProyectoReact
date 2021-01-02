const mongoose = require('mongoose');
const { db } = require('../Models/Usuario');
require('dotenv').config({ path:'varieables.env'});

const conectarDB = async () =>{

    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB conectada')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;
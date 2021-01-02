const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');



//crear servidor
const app = express();
conectarDB();
//habilitar cors
app.use(cors());
//habilitar express.json
app.use(express.json({ extended : true }));

//puerto de la APP
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios',require('./Routes/usuarios'));
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/Proyectos',require('./Routes/Proyectos'));
app.use('/api/Tareas',require('./Routes/Tareas'));


//arrancar la APP
app.listen(PORT,() =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);   
});
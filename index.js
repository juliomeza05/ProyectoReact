const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');



//crear servidor
const app = express();
conectarDB();
//habilitar cors
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//habilitar express.json
app.use(express.json({ extended : true }));

//puerto de la APP
const port = process.env.PORT || 3000;

//importar rutas
app.use('/api/usuarios',require('./Routes/usuarios'));
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/Proyectos',require('./Routes/Proyectos'));
app.use('/api/Tareas',require('./Routes/Tareas'));


//arrancar la APP
app.listen(port,'0.0.0.0',() =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);   
});
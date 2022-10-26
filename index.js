// "test": "echo \"Error: no test specified\" && exit 1"  ****es lo que estaba en package.json en la parte de scripts 
//import express from 'express'; es lo mismo que lo de abajo
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');

//crear el servidor express
const app = express();

//Configurar cors  ** el use es una funcion que hace que se ejecute para todas las lineas que sigan hacia abajo , ejecuta esta instruccion cada vez que pasen por ese punto
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConnection();

//console.log(process.env)

//ruta  req = lo que se solicita como headers que cliente fue y res = es lo que nuestro servidor le va a responder al cliente de nuestro backend
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
if (process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const express = require("express");
const app = express();

//Base de datos
require('./database')

//configuración
app.set('port', process.env.Port || 3004);
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Iniciar el servidor
app.listen(app.get('port'), ()=> {
    console.log(`Server on port: ${app.get('port')}`)
});

//Rutas
app.use(require('./controllers/authController'))


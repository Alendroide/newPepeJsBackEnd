//Importaciones
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./swagger-output.json');

//Inicialización del server
const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(morgan());
app.use('/public',express.static('./public'));
app.use(cors());

//Rutas
const route = __dirname + '/src/routers/';
fs.readdirSync(route).forEach(file=>{
    const router = require(route+file);
    app.use('/api',router);
})

//Swagger Docs
app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

//404
app.use((req,res)=>{
    res.status(404).json({msg:"Not Found - 404"})
})

module.exports = app;
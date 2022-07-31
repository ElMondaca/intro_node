//We call all the modules required for the project
const express = require('express');
const debug = require('debug')('app:Main');

//We use destructuring so we can use all the module.exports from the file indicated
const { Config } = require('./src/config/index');
const { ProductsAPI } = require('./src/products/index');
const { UsersAPI } = require('./src/users/index');




const app = express();
//we give the server the capacity to get data from the request.body
app.use(express.json());

//We add the "ProductsAPI", file index on the require module onto the aplication
ProductsAPI(app);
UsersAPI(app);


app.listen(Config.port, () =>{
    debug(`Servidor escuchando en el puerto ${Config.port}`);
}) 
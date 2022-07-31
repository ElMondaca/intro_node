//We add all the dependencies we need to use.
const express = require('express');

const { ProductsController } = require('./controller');

//We use router to automaticaly use the routes for the process this app will do
const router = express.Router();
module.exports.ProductsAPI = (app) => {
    router
        .get('/', ProductsController.getProducts) //http://localhost:3000/api/products/
        .get('/report', ProductsController.generateReport)
        .get('/:id', ProductsController.getProduct)//http://localhost:3000/api/products/23
        .post('/', ProductsController.createProduct)
        .post('/del/:id', ProductsController.deleteProduct)
        .post('/upd/:id', ProductsController.updateProduct)
        
    //We asign /api/products to make available all the previous declared routes onto the next one (examples above)
    app.use('/api/products', router);
};
//We export the functions developed, so we can use them on the products/index.js file
const {ProductsService} = require('./services');
const debug = require('debug')('app:Module-Products-Controller');
const {Response} = require('../common/response');
const createError = require('http-errors');

module.exports.ProductsController = {
    getProducts: async (require, response) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(response, 200, 'Lista de Productos', products);
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    getProduct: async (require, response) => {
        try {
            const {params : {id} } = require;
            let product = await ProductsService.getByID(id);
            if(!product){
                Response.error(response, new createError.NotFound());
            }else{
                Response.success(response, 200, `Producto ${id}`, product);     
            } 
        } catch (error) {
            debug(error);
            Response.error(response);
        } 
    },
    createProduct: async (require, response) => {
        try {
            const { body } = require;
            if(!body || Object.keys(body).lenght === 0){
                Response.error(response, new createError.BadRequest());
            }else{
                let insertedId = await ProductsService.createItem(body);
                Response.success(response, 201, 'Producto agregado', insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    updateProduct: async (request, response) => {
        try {
            //destructuramos los parametros por id y el body
            const {
              params: { id },
            } = request;
            const { body } = request;

            let product = await ProductsService.updateItem(id, body);

            if (!product) {
              Response.error(response, new createError.NotFound());
            } else {
              Response.success(response, 200, `Producto ${id} modificado`, Object(body));
            }
          } catch (error) {
            debug(error);
            Response.error(response);
          }
    },
    deleteProduct: async (request, response) => {
        try {
            const {
              params: { id },
            } = request;
            let product = await ProductsService.deleteItem(id);
            if (product.deletedCount === 1) {
                Response.success(response, 202, `producto ${id} eliminado`, product);
            }else {
                Response.error(response, new createError.NotFound());
            }   
        }catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    generateReport: async (request, response) => {
        try {
            ProductsService.generateReport('Inventario', response);
        } catch (error) {
            debug(error);
            Response.error(response);   
        }
    }
}
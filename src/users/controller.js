const {UsersService} = require('./services');
const debug = require('debug')('app:Module-Users-Controller');
const {Response} = require('../common/response');
const createError = require('http-errors');

module.exports.UsersController = {
    getUsers: async (require, response) => {
        try {
            let users = await UsersService.getAll();
            Response.success(response, 200, 'Lista de Usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    getUser: async (require, response) => {
        try {
            const {params : {id} } = require;
            let user = await UsersService.getByID(id);
            if(!user){
                Response.error(response, new createError.NotFound());
            }else{
                Response.success(response, 200, `User: ${id}`, user);     
            } 
        } catch (error) {
            debug(error);
            Response.error(response);
        } 
    },
    createUser: async (require, response) => {
        try {
            const { body } = require;
            if(!body || Object.keys(body).lenght === 0){
                Response.error(response, new createError.BadRequest());
            }else{
                let insertedId = await UsersService.createItem(body);
                Response.success(response, 201, 'Usuario agregado', insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    updateUser: async (request, response) => {
        try {
            const {
              params: { id },
            } = request;
            const { body } = request;

            let user = await UsersService.updateItem(id, body);
            if (!user) {
              Response.error(response, new createError.NotFound());
            } else {
              Response.success(response, 200, `Usuario ${id} modificado`, Object(body));
            }
          } catch (error) {
            debug(error);
            Response.error(response);
          }
    },
    deleteUser: async (request, response) => {
        try {
            const {
              params: { id },
            } = request;
            let user = await UsersService.deleteItem(id);
            if (user.deletedCount === 1) {
                Response.success(response, 202, `producto ${id} eliminado`, user);
            }else {
                Response.error(response, new createError.NotFound());
            }   
        }catch (error) {
            debug(error);
            Response.error(response);
        }
    }
}
const express = require('express');
const {UsersController} = require('./controller');

const router = express.Router();

module.exports.UsersAPI = (app) => {
router
    .get('/', UsersController.getUsers) 
    .get('/:id', UsersController.getUser)
    .post('/', UsersController.createUser)
    .post('/del/:id', UsersController.deleteUser)
    .post('/upd/:id', UsersController.updateUser)

app.use('/api/users', router);
};
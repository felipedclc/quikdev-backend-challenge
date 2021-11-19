const express = require('express');
const controllers = require('../controllers');

// rota: '/user'
const userRouter = express.Router();
userRouter.post('/', controllers.UserController.create);
userRouter.get('/', controllers.UserController.findAll);

module.exports = {
    userRouter,
};

const express = require('express');
const controllers = require('../controllers');

// rota: '/user'
const userRouter = express.Router();
userRouter.post('/', controllers.UserController.create);
userRouter.get('/', controllers.UserController.findAll);
userRouter.get('/:id', controllers.UserController.findById);
userRouter.put('/:id', controllers.UserController.update);
userRouter.delete('/:id', controllers.UserController.remove);

module.exports = {
    userRouter,
};

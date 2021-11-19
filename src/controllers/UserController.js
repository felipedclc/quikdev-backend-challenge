const rescue = require('express-rescue');
const Joi = require('joi').extend(require('@joi/date'));
const UserService = require('../services/UserService');
const validate = require('../middlewares/validate');

const create = [
    validate(Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        birthdate: Joi.date().format('DD/MM/YYYY').required(),
        address: Joi.string().required(),
        addressNumber: Joi.string().required(),
        primaryPhone: Joi.string().min(14).max(15).required(),
        description: Joi.string().required(),
    })),
    rescue(async (req, res) => {
        const { body } = req;
        // console.log('body', body);
        const newUser = await UserService.create(body);
        // console.log(newUser);
        if (newUser.error) return res.status(409).json(newUser.error);

        return res.status(201).json(newUser);
    }),
];

const findAll = rescue(async (_req, res) => {
    const users = await UserService.findAll();
    console.log(users.createdAt);
    return res.status(200).json(users);
});

module.exports = {
    create,
    findAll,
};
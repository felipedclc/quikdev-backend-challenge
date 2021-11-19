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
        const newUser = await UserService.create(body);
        if (newUser.error) return res.status(409).json(newUser.error);

        return res.status(201).json(newUser);
    }),
];

const findAll = rescue(async (_req, res) => {
    const users = await UserService.findAll();

    return res.status(200).json(users);
});

const findById = rescue(async (req, res) => {
    const { id } = req.params;
    const user = await UserService.findById(id);
    if (user.error) return res.status(404).json(user.error);

    return res.status(200).json(user);
});

const update = rescue(async (req, res) => {
    const { params: { id }, body } = req;
    const putUser = await UserService.update(id, body);

    return res.status(200).json(putUser);
});

const remove = rescue(async (req, res) => {
    const { id } = req.params;
    const deleted = await UserService.remove(id);
    if (deleted.error) return res.status(404).json(deleted.error);

    return res.status(204).send('');
});

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
};
const UserModel = require('../models/UserModel');

const create = async (body) => {
    const newUserId = await UserModel.create(body);

    if (newUserId === null) {
        return { error: { message: 'User already exists' } };
    }

    return UserModel.findById(newUserId);
};

const findAll = async (body) => UserModel.findAll(body);

module.exports = {
    create,
    findAll,
};
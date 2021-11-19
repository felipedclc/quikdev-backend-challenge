const NOT_FOUND_MSG = 'User not found';
const UserModel = require('../models/UserModel');

const create = async (body) => {
    const newUserId = await UserModel.create(body);

    if (newUserId === null) {
        return { error: { message: NOT_FOUND_MSG } };
    }

    return UserModel.findById(newUserId);
};

const findAll = async (body) => UserModel.findAll(body);

const findById = async (userId) => {
    const user = await UserModel.findById(userId);
    if (user === null) return { error: { message: NOT_FOUND_MSG } };
    return user;
}; 

const update = async (userId, body) => {
    const putUser = await UserModel.update(userId, body);
    if (putUser === null) return { error: { message: NOT_FOUND_MSG } };
    return UserModel.findById(userId);
};

const remove = async (userId) => {
    const deleted = await UserModel.remove(userId);
    if (deleted === null) return { error: { message: NOT_FOUND_MSG } };
    return deleted;
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
};
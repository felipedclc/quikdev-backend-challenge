const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    return db.collection('user').findOne(ObjectId(id));
};

const findByPrimaryPhone = async (primaryPhone) => {
    const db = await connection();
    return db.collection('user').findOne({ primaryPhone });
};

const create = async (body) => {
    const {
        name, username, birthdate, address, addressNumber, primaryPhone, description,
    } = body;

    const userExists = await findByPrimaryPhone(primaryPhone);
    if (userExists !== null) return null;

    const db = await connection();
    const newUser = await db.collection('user').insertOne({
        name,
        username,
        birthdate,
        address,
        addressNumber,
        primaryPhone,
        description,
        createdAt: new Date().toISOString(),
    });
    return newUser.insertedId.toString();
};

const findAll = async () => {
    const db = await connection();
    return db.collection('user').find({}).toArray();
};

module.exports = {
    create,
    findAll,
    findById,
};
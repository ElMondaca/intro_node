//We use deconstruring to use the database/index functions
const  {Mongo} = require('../database/index');
const { ObjectId } = require('mongodb');
const { response } = require('express');

const COLLECTION = 'users';

const getAll = async () => {
    const collection = await Mongo(COLLECTION);
    return await collection.find({}).toArray();
}

const getByID = async (id) =>{
    const collection = await Mongo(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
}

const createItem = async (product) => {
    const collection = await Mongo(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const deleteItem = async (id) => {
  const collection = await Mongo(COLLECTION);
  let result = await collection.deleteOne({ _id: ObjectId(id) });
  return result;
}

const updateItem = async (id, product) => {
    const collection = await Mongo(COLLECTION);
    let result = await collection.updateOne(
        { _id: ObjectId(id) },
        { $set: { ...product } },
        { upsert: true }
      );
      return result;
}


module.exports.UsersService = {
    getAll,
    getByID,
    createItem,
    deleteItem,
    updateItem
}
//We require the client that will help us to connect to mongoAtlas
const { MongoClient } = require('mongodb');
const { Config } = require('../config/index');
const debug = require('debug')('app:Module-mongoDB');

var connection = null
module.exports.Mongo = (collection) => new Promise(async (resolve, reject) => {
    //Mongo client helps using async and await promises
    try {
        //We use a singletone like coding so we dont create a connection every time we try to manipulate data
        if (!connection) {
            const client = new MongoClient(Config.mongoUri);
            connection = await client.connect();
            debug('Nueva conexión realizada con MongoDB Atlas');
        }
        debug('Reutilizando conexión');
        const db = connection.db(Config.mongoDbName);
        resolve(db.collection(collection));
    } catch (error) {
        reject(error);
    }
})

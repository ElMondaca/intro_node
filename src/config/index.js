//we use dotenv, to search the .env doc, and then we can use the data there
require('dotenv').config();


//Here we export the modules or data we will be using
module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DBNAME
}
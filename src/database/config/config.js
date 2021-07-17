require('dotenv').config()
module.exports =

{
  "development": {

    /*"username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,*/
    "username": "be746c8c643c0d",
    "password": "de6c190e",
    "database": "heroku_a537d65da4a5405",
    "host": "us-cdbr-east-04.cleardb.com",
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
  },

    seederStorage: "sequelize",
    seederStorageTableName: "seeds",

    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations"

}

import sequelize from "sequelize";

const dbSqlite = new sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
})

export default dbSqlite


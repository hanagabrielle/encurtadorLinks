import Sequelize from "sequelize";
import dbSqlite from '../database/database.js'

 const link = dbSqlite.define('link', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    alias: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link_original: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

export default link
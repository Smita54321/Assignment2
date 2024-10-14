const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Create database tables and models */
db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.phones = require("./phone.model.js")(sequelize, Sequelize);
db.companies = require("./company.model.js")(sequelize, Sequelize);

// Define the relationship
db.contacts.hasMany(db.phones, { foreignKey: 'contactId', as: 'phones' });
db.phones.belongsTo(db.contacts, { foreignKey: 'contactId', as: 'contact' });

db.contacts.hasMany(db.companies, { foreignKey: 'contactId', as: 'companies' });  // New relationship for companies
db.companies.belongsTo(db.contacts, { foreignKey: 'contactId', as: 'contact' });

module.exports = db;
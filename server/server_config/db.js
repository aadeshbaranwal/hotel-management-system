const Sequelize = require('sequelize')
const users = require('./models/users.js')
const rooms = require('./models/rooms.js');
const bookingDetails = require('./models/bookingDetails.js');

const db = new Sequelize('banks', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    define:{
        timestamps:false, 
    }
});


db.authenticate()
    // db.sync(
    //     { force: true } 
    // )
    .then(() => console.log('Connection has been established successfully.'))
    .catch((err) => console.log('Unable to connect to the database:', err))

const usersModel = users(db, Sequelize)
const roomModel = rooms(db, Sequelize)
const bookingModel = bookingDetails(db, Sequelize)

console.log(usersModel)

module.exports = {usersModel, roomModel, bookingModel}
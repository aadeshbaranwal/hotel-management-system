// const { Sequelize } = require('sequelize/types')

module.exports = (sequelize, Sequelize) => {
    const rooms = sequelize.define("rooms", {
        roomnumber: {
            type: Sequelize.STRING,
            allownull: false,
            primaryKey: true,
            unique: true
        }, 
        roomfloor: {
            type: Sequelize.INTEGER,
            allownull: false
        },
        roomtype: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bedroom: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        booked: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }    

    })
    
    return rooms
}
module.exports = (sequelize, Sequelize) => {
    const bookingDetails = sequelize.define("bookingDetails", {
        username: {
            type: Sequelize.STRING,
            allownull: false,
            primaryKey: false
        },
        bedroom: {
            type: Sequelize.INTEGER,
            allownull: false,
            primaryKey: false
        }, 
        checkIn: { 
            type: Sequelize.STRING,
            allownull: false
        },
        checkOut: {
            type: Sequelize.STRING,
            allowNull: false
        },
        payment: {
            type: Sequelize.INTEGER,
            allownull:false
        },
        persons: {
            type: Sequelize.INTEGER,
            allowNull: false
        }, 
        children: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        allotedRoomNumber:{
            type: Sequelize.STRING,
            allownull: false
        }  
    })

    bookingDetails.removeAttribute('id');
    
    return bookingDetails
}
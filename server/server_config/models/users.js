const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {

    const users = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
        {

            hooks: {
                beforeCreate: function (user) {
                    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
                },
                beforeBulkUpdate: function (user) {
                    console.log("before update", 'user', user)
                    user.attributes.password = bcrypt.hashSync(user.attributes.password, bcrypt.genSaltSync(10));
                }
            }
        } 
    )

    users.prototype.validPassword = function (password) {
        const result=bcrypt.compareSync(password, this.password);
        console.log("checking compareSync", result);
        return result;
    }

    return users
}
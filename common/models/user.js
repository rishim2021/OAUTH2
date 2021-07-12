module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
    
    UserId : {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    UserName: {
        type: Sequelize.STRING,
        allowNull:false
    },

    UserEmail:{
        type:Sequelize.STRING,
        unique :true,
        allowNull:false
    },
    
    UserPhone:{
        type:Sequelize.STRING,
        unique :true,
        allowNull:false
    },

    UserPassword:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
    IsActive: {
        type: Sequelize.ENUM('0','1'),
        defaultValue:'1'
    },
    SoftDelete: {
        type: Sequelize.ENUM('0','1'),
        defaultValue:'0'
    }
    
    });
    
    
    return User;
    
    };
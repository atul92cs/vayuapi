const sequelize=require('sequelize');
const db=require('../config/database');
const Category=db.define('categories',{
    name:{
        type:sequelize.STRING
    },
    picture:{
        type:sequelize.STRING
    }
});
module.exports=Category;
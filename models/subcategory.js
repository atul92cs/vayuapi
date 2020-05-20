const sequelize=require('sequelize');
const db=require('../config/database');
const Subcategory=db.define('subcategories',{
    name:{
        type:sequelize.STRING
    },
    category:{
        type:sequelize.INTEGER
    },
    picture:{
        type:sequelize.STRING
    }
});
module.exports=Subcategory;
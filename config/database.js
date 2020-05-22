const mysql=require('mysql2');
const sequelize=require('sequelize');
const db=new sequelize('IOQyvWVlQq','IOQyvWVlQq','4CLqbgclJt',{
    host:'remotemysql.com',
    port:'3306',
    dialect:'mysql'
});
module.exports=db;
const mysql=require('mysql2');
const db=mysql.createConnection({
    host:'remotemysql.com',
    port:'3306',
    user:'IOQyvWVlQq',
    database:'IOQyvWVlQq',
    password:'4CLqbgclJt'
});
module.exports=db;
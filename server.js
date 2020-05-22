const express=require('express');
const PORT=process.env.PORT||8080;
const subcateogry=require('./routes/Subcategoryfunctions');
const category=require('./routes/Categoryfunctions');
const app=express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/category',category);
app.use('/suubcategory',subcateogry);
app.listen(PORT,()=>{
    console.log('server.started');
});
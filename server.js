const express=require('express');
const PORT=process.env.PORT||8080;
const subcategory=require('./routes/Subcategoryfunctions');
const category=require('./routes/Categoryfunctions');
const route=require('./routes/index');
const path=require('path');
const app=express();
const exphbs=require('express-handlebars');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','handlebars');
app.engine('handlebars',exphbs({defaultlayout:'main'}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/category',category);
app.use('/',route);
app.use('/suubcategory',subcategory);
app.listen(PORT,()=>{
    console.log('server started on ' +PORT);
});
const express=require('express');
const PORT=process.env.PORT||8080;
const subcategory=require('./routes/Subcategoryfunctions');
const category=require('./routes/Categoryfunctions');
const route=require('./routes/index');
const _hnaldebars=require('handlebars');
const path=require('path');
const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access');
const app=express();
const exphbs=require('express-handlebars');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','handlebars');
app.engine('handlebars',exphbs({defaultlayout:'main',
handlebars:allowInsecurePrototypeAccess(_hnaldebars)
}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/category',category);
app.use('/',route);
app.use('/subcategory',subcategory);
app.listen(PORT,()=>{
    console.log('server started on ' +PORT);
});
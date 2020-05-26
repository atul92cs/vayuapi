const  expres=require('express');
const router=expres.Router();
const Category=require('../models/category');
router.get('/',(req,res)=>{
    res.render('addcategory');
});
router.get('/subcategory',(req,res)=>{
     Category.findAll().then(result=>{
        const categories=result;
       res.render('addsubcategory',{categories});
     }).catch(err=>{
        res.status(401).json({
            error:err
        });
     });
});
module.exports=router;
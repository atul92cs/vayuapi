const  expres=require('express');
const router=expres.Router();
const Category=require('../models/category');
const Subcategory=require('../models/subcategory')
router.get('/',(req,res)=>{
   Category.findAll({}).then(result=>{
       const categories=result;
    res.render('addcategory',{categories});
   }).catch(err=>{
       res.status(401).json({
           message:'error occrued',
           error:err
       });
   });
});
router.get('/subcategory',(req,res)=>{
     Category.findAll().then(result=>{
        Subcategory.findAll().then(sub=>{
            const categories=result;
            const subcategories=sub;
            res.render('addsubcategory',{categories,subcategories});
        }).catch(err=>{
            res.status(401).json({
                error:err
            });
        });
     }).catch(err=>{
        res.status(401).json({
            error:err
        });
     });
});
module.exports=router;
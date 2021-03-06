const sequelize=require('sequelize');
const Subcategory=require('../models/subcategory');
const express=require('express');
const router=express.Router();
const multer=require('multer');
const cloudinary=require('cloudinary');
const storage=multer.diskStorage({
    filename:(req,file,callback)=>{
        callback(null,Date.now()+file.originalname);
    }
});
cloudinary.config({
    cloud_name:'dkhk4gyey',
    api_key:'459656749761335',
  api_secret:'AS_y6ZzH7FAjeoIxF1IjtMFKzQg'
});
const upload=multer({storage:storage});
router.post('/create',upload.single('picture'),async(req,res)=>{
    const {name,category}=req.body;
    const picture=await cloudinary.v2.uploader.upload(req.file.path);
    Subcategory.create({
        name:name,
        category:category,
        picture:picture.url
    }).then(()=>{
        res.status(200).json({
            msg:'subcategory created'
        });
    }).catch(err=>{
        res.status(401).json({
            msg:'error occured',
            error:err
        });
    });
});
router.put('/update/:id',async(req,res)=>{
    const {id}=req.params;
    if(req.file)
    {
       const {name,category}=req.body;
       const picture=await cloudinary.v2.uploader.upload(req.file.path);
       Subcategory.update({
           name:name,
           category:category,
           picture:picture.url
       },{where:{id:id}}).then(()=>{
            res.status(200).json({
                msg:'subcategory updated'
            });
       }).catch(err=>{
           res.status(401).json({
               msg:'error occured',
               error:err
           });
       });
    }
    else
    {
       const {name,category}=req.body;
       Subcategory.update({
           name:name,
           category:category
       },{where:{id:id}}).then(()=>{
          res.status(200).json({
              msg:'subcategory updated'
          });
       }).catch(err=>{
             res.status(401).json({
                 msg:'error occured',
                 error:err
             });
       });
    }
});
router.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params;
    Subcategory.destroy({where:{id:id}}).then((result)=>{
           if(result==1)
           {
            res.status(200).json({
                msg:'subcategory deleted'
            });
           }
           else
           {
              res.status(401).json({
                  msg:'error occured subcategory not found'
              });
           }
    }).catch(err=>{
          res.status(403).json({
              msg:'error occured',
              error:err
          });
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    Subcategory.findAll({where:{category:id}}).then(result=>{
         res.status(200).json({
             subcategoreis:result
         });
    }).catch(err=>{
           res.status(401).json({
               msg:'error occured',
               error:err
           });
    });
});

module.exports=router;
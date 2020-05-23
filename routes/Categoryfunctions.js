const express=require('express');
const sequelize=require('sequelize');
const router=express.Router();
const Category=require('../models/category');
const cloudinary=require('cloudinary');
const multer=require('multer');
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
router.post('/create',upload.single('photo'),async(req,res)=>{
    const {name}=req.body;
    const picture=await cloudinary.v2.uploader.upload(req.file.path);
    console.log(req.file.path);
    Category.create({
        name:name,
        picture:picture.url
    }).then(()=>{
        res.status(200).json({
            msg:'Category created'
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
       const {name}=req.body;
       const picture=await cloudinary.v2.uploader.upload(req.file.path);
       Category.update({
          name:name,
          picture:picture.url
       },{where:{id:id}}).then(()=>{
           res.status(200).json({
               msg:'category updated'
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
      const {name}=req.body;
      Category.update({
          name:name
      },{where:{id:id}}).then(()=>{
          res.status(200).json({
              msg:'Category updated'
          });
      }).catch(err=>{
          res.status(401).json({
              msg:'errror occrued',
              error:err
          });
      });      
    }
});
router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    Category.destroy({where:{id:id}}).then(result=>{
        if(result==1)
        {
          res.status(200).json({
            message:'Category deleted'
          });
        }
        else
        {
          res.status(403).json({
            message:'Category not found'
          });
        }
    }).catch(err=>{
        res.status(405).json({
            message:'Error occured',
            error:err
          });
    });
});

router.get('/',(req,res)=>{
    Category.findAll({}).then(result=>{
        res.status(200).json({
            categories:result
        });
    }).catch(err=>{
         res.status(401).json({
             msg:'error occured',
             error:err
         });
    });
});

module.exports=router;
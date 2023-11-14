import asyncHandler from "express-async-handler";
import multer from "multer";
import Items from "../models/itemModel.js";

const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,res,cb)=>{
        cb(null,Date.now()+"_"+(res.originalname).trim());
    }
});
const upload = multer({
    storage:Storage,
}).single('imgFile');

const addItem = asyncHandler(async(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            // res.send(req.file);
            const item = Items.create({
                item_name:req.body.item_name,
                item_price:req.body.item_price,
                item_desc:req.body.item_desc,
                item_img:{
                    contentType:'image',
                    data:req.file.filename
                }
            });
            if(item){
                res.send({"uploaded":true});
            }else{
                res.send({"uploaded":false});
            }
        }
    })
});

const getAllItem = asyncHandler(async(req,res)=>{
    const items = await Items.find({});
    res.json(items);
});

const updateItem = asyncHandler(async(req,res)=>{
    if(req.body.price != null || req.body.price != ""){
        await Items.findByIdAndUpdate({"_id":req.body.id},{"item_price":req.body.price},{new:true},(err,doc)=>{
            if(!err){
                res.send({"status":true,"msg":"Price updated"});
            }else{
                res.send({"status":false,"msg":err});
            }
        })
    }
    if(req.body.desc != null || req.body.desc != ""){
        await Items.findByIdAndUpdate({"_id":req.body.id},{"item_desc":req.body.desc},{new:true},(err,doc)=>{
            if(!err){
                res.send({"status":true,"msg":"Description updated"});
            }else{
                res.send({"status":false,"msg":err});
            }
        })
    }
    
});

const deleteItem = asyncHandler(async(req,res)=>{
    await Items.findByIdAndDelete(req.params.id,function(err,doc){
        if(!err){
            res.send({"msg":"Item Deleted"})
        }else{
            res.send(err);
        }
    });
});

const getItemById = asyncHandler(async(req,res)=>{
    const item = await Items.findOne({"_id":req.params.id})
    if(item){
        res.send(item);
    }else{
        res.send({"msg":"Item not found"});
    }
})

export { addItem, getAllItem, updateItem, deleteItem, getItemById };
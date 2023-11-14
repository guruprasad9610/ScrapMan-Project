import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import SlotModel from "../models/slotModel.js";
const ObjectId = mongoose.SchemaType.ObjectId;

const createSlot = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const body ={
        "date":req.body.date,
        "time":req.body.time
    }
    let slots = await SlotModel.find({date:body.date,time:body.time})
    console.log(slots.length);
    if(slots.length>0){
        res.send({
            "status":false,
            "msg":"slot already added"
        })
    }else{
        let data = SlotModel.create(body)
        if(data){
            res.send({
                "status":true,
                "msg":"time added"
            })
        }else{
            res.send({
                "status":false,
                "msg":"failed to add time"
            })
        }
    }
})

const getAllSlot = asyncHandler(async(req,res)=>{
    const data = await SlotModel.find({})
    res.send(data)
});

const getSlotsByDate = asyncHandler(async(req,res)=>{
    const data = await SlotModel.find({date:req.body.date})
    res.send(data);
})

const updateSlot = asyncHandler(async(req,res)=>{
    await SlotModel.findByIdAndUpdate({_id:req.body.id},{
        date:req.body.date,
        time:req.body.time
    },{new:true},(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            res.send(err);
        }
    })
})
const deleteSlot = asyncHandler(async(req,res)=>{
    await SlotModel.findByIdAndDelete({_id:req.query.id}).then(data=>{
        if(data){
            res.send({
                "status":true,
                "msg":"slot removed"
            })
        }else{
            res.send({
                "status":false,
                "status":"failed to remove slot"
            })
        }
    })
})

export {createSlot,getAllSlot,getSlotsByDate,updateSlot,deleteSlot}
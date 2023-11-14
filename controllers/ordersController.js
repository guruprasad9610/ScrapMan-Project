import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import url from "url";
import querystring from "querystring";
import Assign from "../models/assignModel.js";
import mongoose from "mongoose";
import SlotModel from "../models/slotModel.js";
const ObjectId = mongoose.Types.ObjectId;

const getAllOrders = asyncHandler(async(req , res)=>{
    const orders = await Order.find({});
    res.json(orders);
});

const createOrder = asyncHandler(async(req, res)=>{
    const order = await Order.create({
        order_by:req.body.order_by,
        items:req.body.items,
        status:-1
    });
    if(order){
        res.send({"o_id":order._id,"status":true,"msg":"Order Saved"});
    }else{
        res.send({"o_id":null,"status":false,"msg":"Order can't be placed"});
    }
});
const placeOrder = asyncHandler(async(req, res)=>{
    // const order = await Order.find({"_id":req.body.order_id});
    Order.findByIdAndUpdate({"_id":req.body.order_id},{"location":req.body.location,"pickup_date":req.body.pickup_date,"pickup_time":req.body.pickup_time,"status":0},{new:true},(err,orderDoc)=>{
        if(!err){
            SlotModel.findOneAndUpdate({date:req.body.pickup_date, time:req.body.pickup_time},{isAvailable:false},{new:true},(err,doc)=>{
                if(!err){
                    res.send({"status":true,"order":orderDoc,"slot":doc});
                }else{
                    res.send({"status":false,"error":err});
                }
            })
            
        }else{
            res.send({"status":false,"error":err})
        }
    })

})

const cancelOrder = asyncHandler(async(req,res)=>{
    Order.findByIdAndUpdate({"_id":req.params.id},{"location":req.body.location,"pickup_date":req.body.pickup_date,"pickup_time":req.body.pickup_time,"status":2},{new:true},(err,doc)=>{
        if(!err){
            res.send({"status":doc.status == 2})
        }else{
            res.send(err)
        }
    })
})

const updateOrder = asyncHandler(async(req,res)=>{

    if(req.body.location !=null || req.body.location != ""){
        await Order.findByIdAndUpdate({"_id":req.body.id},{"location":req.body.location},{new:true},(err,doc)=>{
            if(!err){
                res.send({"status":true,"msg":"location updated"})
            }else{
                res.send(err)
            }
        })
    }
    if(req.body.pickup_time != null || req.body.pickup_date != null || req.body.pickup_time != "" || req.body.pickup_date != ""){
        await Order.findByIdAndUpdate({"_id":req.body.id},{"pickup_time":req.body.pickup_time,"pickup_date":req.body.pickup_date},{new:true},(err,doc)=>{
            if(!err){
                res.send({"status":true,"msg":"pickup date and time updated"})
            }else{
                res.send(err)
            }
        })
    }
    // if(req.body.items != null){
    //     await Order.findByIdAndUpdate({"_id":req.body.id},{$push:{"items":req.body.item}},{new:true},(err,doc)=>{
    //         if(!err){
    //             res.send({"status":true,"msg":"Items Added"})
    //         }else{
    //             res.send(err)
    //         }
    //     })
    // }

    // const order = await Order.findByIdAndUpdate({"_id":req.params.id})
})

const addItemtoOrder = asyncHandler(async(req,res)=>{
    if(req.body.items != null){
        Order.findByIdAndUpdate({"_id":req.body.id},{$push:{"items":req.body.items}},{safe: true, upsert: true, new:true},(err,doc)=>{
            if(!err){
                res.send({"status":true,"msg":doc})
            }else{
                res.send({"status":false,"msg":err})
            }
        })
    }
})

const removeItemfromOrder = asyncHandler(async(req,res)=>{
    if(req.body.id != null){
        Order.findByIdAndUpdate({"_id":req.body.id},{$pull:{"items":{"_id":req.body.itemId}}},{new:true},(err,doc)=>{
            if(!err){
                res.send({"status":true,"msg":"item removed from the order"});
            }else{
                res.send({"status":false,"msg":err});
            }
        })
    }
})

const getOrderByUserId = asyncHandler(async(req,res)=>{
    const orders = await Order.find({"order_by":req.body.user_id});
    res.json(orders); 
})

const getOrderByOrderId = asyncHandler(async(req,res)=>{
    const orders = await Order.findOne({"_id":req.params.id});
    res.json(orders);
    // const order = await Order.aggregate([
    //     {
    //         $match:{
    //             _id:ObjectId(req.params.id)
    //         }
    //     },
    //     {
    //         $lookup:{
    //             from:"users",
    //             localField:"order_by",
    //             foreignField:"_id",
    //             as:"join_order_user"
    //         }

    //     }
    // ]);
    // if(order){
    //     let user = order[0].join_order_user[0]
    //     console.log(user);
    //     res.json({
    //             "_id": order[0]._id,
    //             "items": order[0].items,
    //             "status": order[0].status,
    //             "location": order[0].location,
    //             "pickup_date": order[0].pickup_date,
    //             "pickup_time": order[0].pickup_time,
    //             "assign_to": "",
    //             "order_by":{
    //                 "_id":user._id,
    //                 "name": user.name,
    //                 "email": user.email,
    //                 "mobile": user.mobile,
    //             }
    //             // "order_by":order.join_order_user
            
    //     })
    //     // res.send(order[0])
    // }else{
    //     res.send(null)
    // }
})

const confirmOrder = asyncHandler(async(req,res)=>{
    // console.log(req.query.order_id)
    await Order.findByIdAndUpdate(req.params.id,{"status":3},{new:true},(err,doc)=>{
        if(!err){
            res.send("order confirmed");
        }else{
            res.send(err)
        }

    });
});

export { getAllOrders,createOrder,placeOrder,cancelOrder,updateOrder,addItemtoOrder,removeItemfromOrder,getOrderByUserId,getOrderByOrderId, confirmOrder };


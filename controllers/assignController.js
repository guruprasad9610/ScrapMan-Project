import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Assign from "../models/assignModel.js";
import Order from "../models/orderModel.js";
const ObjectId = mongoose.Types.ObjectId;

const assignOrders = asyncHandler(async(req,res)=>{
    await Assign.find({order_id:req.body.order_id},(err,doc)=>{
        if(!err){
            if(doc.length > 0){
                res.send({
                    "msg":"Order already Assigned"
                })
            }else{
                let body = {
                    "order_id":req.body.order_id,
                    "agent_id":req.body.agent_id,
                    "user_id":req.body.user_id,
                    "pickup_date":req.body.pickup_date,
                    "pickup_time":req.body.pickup_time
                }
                const assign = Assign.create(body);

                if(assign){
                    Order.findByIdAndUpdate(req.body.order_id,{$set:{assign_to:req.body.agent_id}},{new:true},(err,doc)=>{
                        if(!err){
                            res.send({
                                "msg":"order assigned"
                            })
                        }else{
                            res.send(err)
                        }
                    })
                    
                }else{
                    res.send({
                        "msg":"error occured"
                    })
                }
            }
        }
    })
        
    // res.send(getAssign);
    // if()

    
    // const assign = await Assign.create(body);

    // if(assign){
    //     res.send({
    //         "msg":"order assigned. waiting for the agent to accept"
    //     })
    // }else{
    //     res.send({
    //         "msg":"error occured"
    //     })
    // }
});

const getAcceptedOrders = asyncHandler(async(req,res)=>{
    let data = await Assign.find({"isAccepted":1});
    if(data){
        res.send(data);
    }else{
        res.send();
    }
});
const getUnAcceptedOrRejectedOrders = asyncHandler(async(req,res)=>{
    let data = await Assign.find({$or:[{"isAccepted":0},{"isAccepted":-1}]})
    if(data){
        res.send(data);
    }else{
        res.send();
    }
});

const getAssignOrderDetails = asyncHandler(async(req,res)=>{
    const data = await Assign.aggregate([
        {
            $match:{
                "_id":ObjectId(req.params.assign_id)
            }
        },
        {
            $lookup:{
                from:"orders",
                localField:"order_id",
                foreignField:"_id",
                as:"join_assign_orders"
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"agent_id",
                foreignField:"_id",
                as:"join_assign_agent"
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"user_id",
                foreignField:"_id",
                as:"join_assign_user"
            }
        }
    ]);

    if(data){
        res.send(
            {
                "_id": data[0]._id,
                "isAccepted": data[0].sAccepted,
                "isRecieved": data[0].isRecieved,
                "order_id": data[0].order_id,
                "agent_id": data[0].agent_id,
                "user_id": data[0].user_id,
                "pickup_date": data[0].pickup_date,
                "pickup_time": data[0].pickup_time,
                "orderDetails": data[0].join_assign_orders[0],
                "agent_details": 
                    {
                        "_id": data[0].join_assign_agent[0]._id,
                        "name": data[0].join_assign_agent[0].name,
                        "email": data[0].join_assign_agent[0].email,
                        "mobile": data[0].join_assign_agent[0].mobile,
                    }
                ,
                "userDetails": 
                    {
                        "_id": data[0].join_assign_user[0]._id,
                        "name": data[0].join_assign_user[0].name,
                        "email": data[0].join_assign_user[0].email,
                        "mobile": data[0].join_assign_user[0].mobile,
                    }
                
            }
        );
    }else{
        res.send("nii h data, bhaand mei jao");
    }
})

const getAssignOrderByAgentId = asyncHandler(async(req,res)=>{
    let request = {};
    if(req.body.isReceived != ""){
        if(req.body.date != ""){
            request = {
                agent_id:ObjectId(req.body.id),
                isRecieved:JSON.parse(req.body.isReceived),
                pickup_date:req.body.date
            }
        }else{
            request = {
                agent_id:ObjectId(req.body.id),
                isRecieved: JSON.parse(req.body.isReceived) ,
            }
        }
    }else{
        request = {
            agent_id:ObjectId(req.body.id),
        }
    }
    let data = await Assign.aggregate([
        {
            $match:request
        },
        {
            $lookup:{
                from:"orders",
                localField:"order_id",
                foreignField:"_id",
                as:"join_assign_orders"
            }
        }
    ]);
    if(data){
        res.send(data);
        console.log(request);
    }else{
        res.send(data);
        console.log(request);
    }
});

const acceptOrder = asyncHandler(async(req,res)=>{
    await Assign.findOneAndUpdate({"order_id":req.params.id},{"isAccepted":1},{new:true},(err,doc)=>{
        
        if(!err){
            let order_id = doc.order_id;
            Order.findByIdAndUpdate(order_id,{"status":3,"assign_to":""},{new:true},(err,doc)=>{
                if(!err){
                    res.send({"msg":"Order Accepted"})
                }else{
                    res.send({"msg":err})
                }
            })
            // res.send(doc.order_id);
        }else{
            res.send(err);
        }
    })
});
const rejectOrder = asyncHandler(async(req,res)=>{
    await Assign.findByIdAndUpdate(req.params.id,{"isAccepted":-1},{new:true},(err,doc)=>{
        if(!err){
            res.send({"msg":"order rejected"})
        }else{
            res.send(err);
        }
    })
});

const outForPickup = asyncHandler(async(req,res)=>{
    await Order.findByIdAndUpdate(req.params.id,{"status":4},{new:true},(err,doc)=>{
        if(!err){
            res.send({"msg":"out for pickup"})
            //send mail and otp

        }else{
            res.send({"msg":err})
        }
    })
})

const recivedOrder = asyncHandler(async(req,res)=>{
    await Assign.findOneAndUpdate({"_id":req.params.id},{"isRecieved":true},{new:true},(err,doc)=>{
        if(!err){
            // res.send("Order Received");
            let orderId = doc.order_id;
            console.log(orderId);
            Order.findByIdAndUpdate(orderId,{"status":5},{new:true},(err,doc)=>{
                if(!err){
                    res.send({"status":true,"msg":"Order Received"})
                    //send email notification to all
                }else{
                    res.send(err)
                }
            })
        }else{
            res.send(err)
        }
    });
});

export {assignOrders,getAssignOrderByAgentId , outForPickup, getAcceptedOrders, getUnAcceptedOrRejectedOrders, acceptOrder, rejectOrder, recivedOrder, getAssignOrderDetails}
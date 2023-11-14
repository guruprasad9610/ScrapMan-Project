import mongoose from "mongoose";
// import itemsSchema from "./itemModel.js";
const ObjectId = mongoose.Schema.ObjectId;

const itemsSchema = mongoose.Schema({
    item_id:{
        required:true,
        type:String
    },
    item_name:{
        required:true,
        type:String
    },
    item_price:{
        required:true,
        type:String
    },
    item_weight:{
        required:true,
        type:String
    },
    item_old:{
        required:true,
        type:String
    }
});

const locationSchema=mongoose.Schema({
    address:String,
    landmark:String,
    pincode:Number,
    lat:Number,
    long:Number,
    country:String,
    state:String,
    district:String

})

const orderSchema = mongoose.Schema({
    order_by:{
        type:ObjectId,
        required:true,
    },
    items:{
        type:[itemsSchema],
        required:true
    },
    location:{
        type:locationSchema
    },
    pickup_date:{
        type:String,
        // required:true
    },
    pickup_time:{
        type:String,
        // required:true
    },
    status:{
        type:Number,
    },
    assign_to:{
        type:ObjectId,
    },
    otp:String,

},{
    timestamps:true
});

const order = mongoose.model("orders",orderSchema);

export default order;
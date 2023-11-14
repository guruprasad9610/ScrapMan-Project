import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const assignSchema = new mongoose.Schema({
    order_id:{
        type:ObjectId,
        required:true
    },
    agent_id:{
        type:ObjectId,
        required:true
    },
    user_id:{
        type:ObjectId,
        required:true
    },
    pickup_date:{
        type:String,
        // required:true
    },
    pickup_time:{
        type:String,
        // required:true
    },
    isAccepted:{
        type:Number,
        required:true,
        default:1
    },
    isRecieved:{
        type:Boolean,
        required:true,
        default:false
    },
},{
    timestamps:true
})

const Assign = mongoose.model("Assign",assignSchema);

export default Assign;
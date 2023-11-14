import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const slotSchema = mongoose.Schema({
    date:String,
    time:String,
    isAvailable:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const SlotModel = mongoose.model("slot",slotSchema) 
export default SlotModel;
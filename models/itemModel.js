import mongoose from "mongoose";


const itemsSchema = mongoose.Schema({
    
    item_name:{
        required:true,
        type:String
    },
    item_price:{
        required:true,
        type:String
    },
    item_img:{
        // required:true,
        contentType:String,
        data:Buffer
    },
    item_desc:{
        required:true,
        type:String
    }
},{ timestamp:true });

const item = mongoose.model("items",itemsSchema);


export default item;
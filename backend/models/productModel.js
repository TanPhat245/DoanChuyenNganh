import mongoose from "mongoose";
//san pham
const productSchema = new mongoose.Schema({
    name: { type:String, required:true },
    description: { type:String, required:true },
    price: { type:Number, required:true },
    image: { type:Array, required:true },
    category: { type:String, required:true },
    subCategory: { type:String, required:true },
    sizes: { type:Array, required:true },
    bestseller: {type:Boolean},
    date: { type:Number, required:true },
    status: {type:String, default:'Còn hàng'}
})

const productModel = mongoose.models.products || mongoose.model("products",productSchema);

export default productModel;
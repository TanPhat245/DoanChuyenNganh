
import { v2 as cloudinary } from 'cloudinary'
import categoryModel from "../models/categoryModel.js"


//add
const addCategory = async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.json({ success: false, message: "Tên danh mục không được để trống" });
        }

        const categorytData = {
            name,
        }

        console.log(categorytData);
        
        const category = new categoryModel(categorytData);
        await category.save()
        res.json({ success: true, message: "Đã thêm" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//list
const listCategory = async (req, res) => {
    try {
        const products = await categoryModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}





export { listCategory, addCategory };
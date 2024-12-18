import {v2 as cloudinary } from "cloudinary"

// lưu trữ hình ảnh
const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUBDINARY_NAME,
        api_key:process.env.CLOUBDINARY_API_KEY,
        api_secret:process.env.CLOUBDINARY_SECRET_KEY
    })
}

export default connectCloudinary;
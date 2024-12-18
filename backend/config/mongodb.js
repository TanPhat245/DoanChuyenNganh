import mongoose from "mongoose";
// Lưu trữ data
const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log("Đã kết nối với DB");       
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/mern-ecommern`)

}

export default connectDB;
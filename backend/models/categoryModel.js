import mongoose from "mongoose";

// Định nghĩa schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true } // Chỉ cần trường 'name'
});

// Tạo model
const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;

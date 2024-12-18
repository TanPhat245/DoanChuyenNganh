
import { v2 as cloudinary } from 'cloudinary'
import productModel from "../models/productModel.js"

//add
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller,status } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imageUrl,
            date: Date.now(),
            status
        }

        console.log(productData);
        const product = new productModel(productData);
        await product.save()
        res.json({ success: true, message: "Đã thêm" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//list
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//xia
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Đã xóa" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//thong tin
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "MÃ SẢN PHẨM KHÔNG HỢP LỌEE",
            });
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "SẢN PHẨM KHÔNG TỒN TẠI",
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error("KHÔNG CÓ TRONG DANH SÁCH:", error);
        res.status(500).json({
            success: false,
            message: "LỖI SERVER",
        });
    }
};

// tình tạng
const updateProductStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await productModel.findByIdAndUpdate(id, { status });
        res.json({ success: true, message: "Cập nhật trạng thái thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller, status } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!id || !name || !description || !price || !category || !subCategory) {
            return res.status(400).json({ success: false, message: "Thông tin sản phẩm không đầy đủ." });
        }

        // Xử lý sizes (convert JSON string to array)
        let parsedSizes = [];
        if (sizes) {
            try {
                parsedSizes = JSON.parse(sizes);
            } catch (error) {
                return res.status(400).json({ success: false, message: "Dữ liệu sizes không hợp lệ." });
            }
        }

        // Kiểm tra sản phẩm tồn tại
        const updatedProduct = await productModel.findById(id);
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm." });
        }

        // Cập nhật các trường sản phẩm
        updatedProduct.name = name;
        updatedProduct.description = description;
        updatedProduct.price = price;
        updatedProduct.category = category;
        updatedProduct.subCategory = subCategory;
        updatedProduct.sizes = parsedSizes;
        updatedProduct.bestseller = bestseller === "true";
        updatedProduct.status = status;

        // Xử lý ảnh
        if (req.files && Object.keys(req.files).length > 0) {
            const imagePaths = updatedProduct.image || [];
            Object.values(req.files).forEach((fileArray) => {
                fileArray.forEach((file) => {
                    imagePaths.push(file.path);
                });
            });
            updatedProduct.image = imagePaths;
        }

        // Lưu sản phẩm cập nhật
        await updatedProduct.save();

        res.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Có lỗi xảy ra khi cập nhật sản phẩm." });
    }
};






export { listProduct, addProduct, removeProduct, singleProduct, updateProductStatus, updateProduct };
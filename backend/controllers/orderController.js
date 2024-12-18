import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Hoặc dùng dịch vụ khác
    auth: {
        user: 'phatt4071@gmail.com', // Thay thế bằng email của bạn
        pass: 'mmow mcfu wlcj kfko'   // Mật khẩu ứng dụng nếu bạn sử dụng Gmail
    }
});

const sendOrderConfirmationEmail = async (email, orderDetails) => {
    const mailOptions = {
        from: 'phatt4071@gmail.com', // Email của bạn
        to: email, // Email người nhận
        subject: 'Đặt hàng thành công!',
        text: `Chào bạn,\n\nCảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Dưới đây là thông tin đơn hàng của bạn:\n\n` +
              `${orderDetails.items.map(item => `${item.name} - Số lượng: ${item.quantity}`).join('\n')}\n\n` +
              `Tổng tiền: ${orderDetails.amount}.000 VND\nPhương thức thanh toán: COD\n\n` +
              `Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.\n\nCảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
    }
};

const placeOrders = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId: userId || null, // Nếu không đăng nhập, userId là null
            items,
            address,
            amount,
            paymentMethod: "COD", 
            payment: false,
            date: Date.now(),
        };

        // Tạo đơn hàng cho úuerbeo
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Nếu ủe tồn tại, xóa giỏ hàng trong userModel khẹc khẹc
        if (userId) {
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
        }
        if (address.email) {
            await sendOrderConfirmationEmail(address.email, orderData);
        }

        res.status(201).json({ success: true, message: "Đã đặt hàng", order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const placeOrderStripe = async (res,req) => {
    try {
        // cốt stripe
        res.status(501).json({ success: false, message: "Chức năng đang được phát triển" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }}

const placeOrderMOMO = async (res,req) => {
    try {
        // Cốt mômmo
        res.status(501).json({ success: false, message: "Chức năng đang được phát triển" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const allOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const userOrders = async(req,res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const updateStatusOrders = async(req,res) => {
    try {
        const { orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true,message:'Cập nhật thành công'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export {placeOrders, placeOrderStripe, placeOrderMOMO, allOrders, userOrders, updateStatusOrders, sendOrderConfirmationEmail, transporter}
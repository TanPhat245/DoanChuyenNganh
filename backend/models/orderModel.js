import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  items: { type: Array, required: true }, 
  amount: { type: Number, required: true },
  address: { 
    type: Object, 
    required: true, 
    properties: {
      name: { type: String, required: true }, 
      email: { type: String, required: true },
      phone: { type: String, required: true }, 
      address: { type: String, required: true },
    },
  },
  status: { type: String, required: true, default: 'Đã đặt hàng' },
  paymentMethod: { type: String, required: true }, 
  payment: { type: Boolean, required: true, default: false }, 
  date: { type: Number, required: true }, 
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;

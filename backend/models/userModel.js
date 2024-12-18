import mongoose from "mongoose";
// user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: false },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model('user',userSchema);
export default userModel;
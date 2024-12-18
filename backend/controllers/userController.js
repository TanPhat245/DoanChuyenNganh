import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
//login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false, message:"Tài khoản đã không tồn tại"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true,token,message:"Đăng nhập thành công"})
        }
        else {
            res.json({success:false, message: 'Sai mật khẩu'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//dang ky
const registerUser = async (req,res) => {
   try {
        const {name, email, password, street,city, state, district, country, phone} = req.body;
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"Tài khoản hoặc email đã tồn tại"})
        }
        //dùng cái validator để kt email
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Email không hợp lệ"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Mật khẩu phải từ 8 chữ số trở lên"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        const newUser = new userModel({
            name,
            email,
            password:hashPassword,
            street,
            city,
            state,
            district,
            country,
            phone,
        });

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token,message:"Tạo thành tài khoản thành công"})
   } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
   }
}

//login cho et min
const adminLogin = async (req, res) => {
    try {
        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Sai email hoặc mật khẩu"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const getUserProfile = async (req, res) => {
    try {
      // Sử dụng req.userId thay vì req.user.id
      const user = await userModel.findById(req.userId).select("-password"); // Không lấy mật khẩu
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Lỗi máy chủ",
      });
    }
  };

//mua doi voi nguoi dung không đăng nhập
export { loginUser, registerUser,adminLogin, getUserProfile }
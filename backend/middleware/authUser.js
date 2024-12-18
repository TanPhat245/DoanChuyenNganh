import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  
  if (!token) {
    return res.json({ success: false, message: "Bạn phải đăng nhập trước khi sử dụng" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Token không hợp lệ" });
  }
};

export default authUser;

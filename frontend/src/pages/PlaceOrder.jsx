import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartToltal from '../components/CartToltal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backenUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    district: '',
    country: '',
    phone: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const onLoginChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginData((data) => ({ ...data, [name]: value }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backenUrl}/api/user/login`, loginData);
      if (response.data.success) {
        setToken(response.data.token); // Save the token
        toast.success('Đăng nhập thành công');
      } else {
        toast.error('Đăng nhập thất bại');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi đăng nhập');
    }
  };

  const onSubmitHandler = async () => {
    setIsSubmitting(true);
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error('Giỏ hàng của bạn không có sản phẩm!');
        setIsSubmitting(false);
        return;
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backenUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
            toast.success('Đặt hàng thành công');
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
      setIsDialogOpen(false);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(backenUrl + '/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); if (response.data.success) {
          const { name, email, street, city, state, district, country, phone } = response.data.user;
          setFormData({
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' '),
            email: email || '',
            street: street || '',
            city: city || '',
            state: state || '',
            district: district || '',
            country: country || '',
            phone: phone || '',
          });
        } else {
          toast.error('Không thể lấy thông tin người dùng');
        }
      } catch (error) {
        console.error(error);
        toast.error('Lỗi khi lấy thông tin người dùng');
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);
  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col sm:flex-row justify-between gap-5 pt-5 sm:pt-14 min-h-[80vh] border-t"
      >
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={'THÔNG TIN'} text2={'VẬN CHUYỂN'} />
          </div>

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Họ"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Tên"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Số nhà"
          />
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Đường/ấp"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Huyện/xã/quận"
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="district"
              value={formData.district}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Tỉnh/Thành phố"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Quốc gia"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Số điện thoại"
          />
        </div>
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartToltal />
          </div>

          <div className="mt-12">
            <Title text1={'PHƯƠNG THỨC'} text2={'THANH TOÁN'} />
          </div>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod('stripe')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod('momo')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'momo' ? 'bg-green-400' : ''}`}></p>
              <img
                className="h-5 mx-4"
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square-1024x1024.png"
                alt=""
              />
            </div>

            <div
              onClick={() => setMethod('cod')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">THANH TOÁN KHI NHẬN HÀNG</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-red-500 text-white px-16 py-3 text-sm">
              THANH TOÁN
            </button>
          </div>
        </div>
      </form>




      {/* Hộp thoại xác nhận */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <p className="text-center mb-4">Bạn có chắc chắn muốn đặt hàng không?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={onSubmitHandler}
                disabled={isSubmitting}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;

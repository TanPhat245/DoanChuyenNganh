import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const UpdateProduct = ({ token }) => {
  const { id: productId } = useParams(); // Lấy productId từ URL

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('ao');
  const [subCategory, setSubCategory] = useState('aothun');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Fetch product details for update
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/product/single`,
          { productId },
          { headers: { token } }
        );

        if (response.data.success) {
          const product = response.data.product;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setSubCategory(product.subCategory);
          setBestseller(product.bestseller);
          setSizes(product.sizes || []);
          setImage1(product.image1 || false);
          setImage2(product.image2 || false);
          setImage3(product.image3 || false);
          setImage4(product.image4 || false);
        } else {
          toast.error('Sản phẩm không tồn tại.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Không thể tải thông tin sản phẩm.');
      }
    };

    fetchProduct();
  }, [productId, token]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', productId);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      // Upload các ảnh mới, giữ ảnh cũ nếu không thay đổi
      if (image1 && typeof image1 !== 'string') formData.append('image1', image1);
      if (image2 && typeof image2 !== 'string') formData.append('image2', image2);
      if (image3 && typeof image3 !== 'string') formData.append('image3', image3);
      if (image4 && typeof image4 !== 'string') formData.append('image4', image4);

      // Nếu ảnh cũ là URL từ Cloudinary, giữ nguyên và không thay đổi
      if (typeof image1 === 'string') formData.append('image1', image1);
      if (typeof image2 === 'string') formData.append('image2', image2);
      if (typeof image3 === 'string') formData.append('image3', image3);
      if (typeof image4 === 'string') formData.append('image4', image4);

      const response = await axios.post(
        `${backendUrl}/api/product/update`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('ao');
    setSubCategory('aothun');
    setBestseller(false);
    setSizes([]);
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
  };

  useEffect(() => {
    return () => {
      [image1, image2, image3, image4].forEach((img) => {
        if (img && typeof img !== 'string') URL.revokeObjectURL(img);
      });
    };
  }, [image1, image2, image3, image4]);
console.log(image1);
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Hình</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={
                  img && typeof img === 'string'
                    ? img // Nếu là URL từ Cloudinary
                    : img
                    ? URL.createObjectURL(img) // Nếu là file object
                    : assets.upload_area // Hình ảnh mặc định nếu không có gì
                }
                alt={`Hình ảnh ${index + 1}`}
              />
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (index === 0) setImage1(file);
                  if (index === 1) setImage2(file);
                  if (index === 2) setImage3(file);
                  if (index === 3) setImage4(file);
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Tên</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Nhập tên"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Mô tả</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Nhập mô tả"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Loại</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="ao">Áo</option>
            <option value="quan">Quần</option>
            <option value="phukien">Phụ kiện</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Phụ</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="aothun">Áo thun Graphic</option>
            <option value="somi">Sơ mi</option>
            <option value="long">Quần dài</option>
            <option value="shorts">Quần shorts</option>
            <option value="giay">Giày</option>
            <option value="bag">Bag</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Giá</p>
          <input
            min="0"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="200.000đ"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Size</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size)
                    ? "bg-blue-500 text-black"
                    : "bg-slate-200"
                } px-3 py-2 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Mới
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-green-700 text-white">
        Cập nhật
      </button>
    </form>
  );
};

export default UpdateProduct;

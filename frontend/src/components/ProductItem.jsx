import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductItem = ({ id, image, name, price, rating = 4, status, bestseller = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasMultipleImages = image && image.length > 1;
  const inStock = !status?.toLowerCase().includes('hết hàng');

  return (
    <Link
      to={`/product/${id}`}
      className="block p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition ease-in-out relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Boolean(bestseller) && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          Mới
        </span>
      )}

      {/* Hình ảnh sản phẩm */}
      <div className="overflow-hidden rounded-lg">
        <img
          className={`transition-transform duration-500 ease-in-out ${hasMultipleImages && isHovered ? '' : ''
            }`}
          src={hasMultipleImages && isHovered ? image[1] : image[0]}
          alt={name}
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="pt-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(rating)].map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-600"><p>{price}.000đ</p></p>
        <p
          className={`text-xs font-medium mt-1 ${inStock ? 'text-green-500' : 'text-red-500'
            }`}
        >
          {inStock ? 'Còn hàng' : 'Hết hàng'}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;

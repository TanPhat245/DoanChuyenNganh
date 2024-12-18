import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Related from "../components/Related";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Phần hình ảnh */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-1/5 gap-2">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className={`cursor-pointer w-24 sm:w-full rounded-md border ${image === item ? "border-green-500" : "border-gray-300"
                  }`}
                alt={`product-thumbnail-${index}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-4/5">
            <img
              src={image}
              className="w-full h-auto rounded-lg shadow-lg"
              alt="product-main"
            />
          </div>
        </div>

        {/* Phần thông tin sản phẩm */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-4">{productData.name}</h1>
          <div className="flex items-center gap-2 text-yellow-500 mb-4">
            {[...Array(5)].map((_, index) => (
              <span key={index}>&#9733;</span>
            ))}
            <span className="text-gray-500">(12)</span>
          </div>
          <p className="text-3xl font-bold text-green-700 mb-6">
            {productData.price}
            {currency}
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            {productData.description}
          </p>

          {/* Chọn size */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Chọn Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`py-2 px-6 rounded-lg border ${item === size
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                    } transition-all duration-200`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <button
            onClick={() => {
              if (productData.status.toLowerCase() === "hết hàng") {
                alert("Sản phẩm này đã hết hàng!");
              } else if (!size) {
                alert("Vui lòng chọn size trước khi thêm vào giỏ hàng.");
              } else {
                addToCart(productData._id, size);
                alert("Sản phẩm đã được thêm vào giỏ hàng.");
              }
            }}
            className={`w-full py-3 ${productData.status.toLowerCase() === "hết hàng"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800 active:bg-green-600"
              } text-white text-lg rounded-lg transition-all`}
            disabled={productData.status.toLowerCase() === "hết hàng"}
          >
            {productData.status.toLowerCase() === "hết hàng"
              ? "HẾT HÀNG"
              : "THÊM VÀO GIỎ HÀNG"}
          </button>


          <hr className="my-8" />
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* Icon thông tin */}
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full">
                <i className="fas fa-tshirt"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Thông tin sản phẩm</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {/* Dòng 1 */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-green-500">
                  <i className="fas fa-check-circle"></i>
                </div>
                <p className="text-sm text-gray-600">100% Cotton</p>
              </div>

              {/* Dòng 2 */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-green-500">
                  <i className="fas fa-check-circle"></i>
                </div>
                <p className="text-sm text-gray-600">Bo cổ dày dặn</p>
              </div>

              {/* Dòng 3 */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-green-500">
                  <i className="fas fa-check-circle"></i>
                </div>
                <p className="text-sm text-gray-600">Hình in sắc nét</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-16">
        <div className="flex border-b">
          {/* Tab mô tả */}
          <button className="px-6 py-3 font-semibold text-lg border-b-2 border-transparent hover:border-green-700 transition-all">
            Mô tả
          </button>

          {/* Tab đánh giá */}
          <button className="px-6 py-3 font-semibold text-lg text-gray-500 hover:text-green-700 transition-all">
            Đánh giá (0)
          </button>
        </div>

        {/* Phần Mô Tả */}
        <div className="py-6 text-gray-700">
          <p className="leading-relaxed text-base mb-4">
            Áo thun này thực sự rất thoải mái và dễ chịu khi mặc. Chất liệu vải mềm mại, thoáng mát, phù hợp cho những ngày hè oi ả. Màu sắc của áo cũng rất đẹp, tươi sáng và giữ được lâu sau khi giặt. Tuy nhiên, nếu bạn là người cao lớn thì có thể nên chọn size lớn hơn một chút vì áo hơi nhỏ so với các kích cỡ thông thường. Tổng thể, tôi rất hài lòng với sản phẩm này.
          </p>
          <p className="leading-relaxed text-base">
            Đặc biệt, áo có thiết kế đẹp mắt, phù hợp với nhiều kiểu trang phục. Dễ dàng phối đồ với quần jeans hay short, tạo ra vẻ ngoài năng động. Tôi cũng thích cách áo giữ được form sau khi giặt mà không bị nhăn hay co lại. Nếu bạn đang tìm một chiếc áo thun đơn giản nhưng thời trang, tôi nghĩ chiếc áo này là một lựa chọn tuyệt vời.
          </p>
        </div>

        {/* Phần Đánh Giá */}
        <div className="py-6 text-gray-700">
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Đánh giá sản phẩm</h3>
            <p className="text-gray-500 text-sm">Chưa có đánh giá nào cho sản phẩm này.</p>
          </div>

          {/* Form gửi đánh giá */}
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="review">
              Để lại đánh giá của bạn:
            </label>
            <textarea
              id="review"
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
            ></textarea>
            <button className="mt-4 py-2 px-6 bg-green-700 text-white rounded-lg hover:bg-green-800 active:bg-green-600 transition-all">
              Gửi Đánh Giá
            </button>
          </div>
        </div>
      </div>


      {/* Sản phẩm liên quan */}
      <Related
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="text-center py-20">
      <p>Đang tải dữ liệu...</p>
    </div>
  );
};

export default Product;

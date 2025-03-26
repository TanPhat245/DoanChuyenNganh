import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("aothun");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loadingDesc, setLoadingDesc] = useState(false);

  const [categorylist, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/category/list"
        );
        if (response.data.success) {
          setCategoryList(response.data.products);
          setCategory(response.data.products[0]?.name || "");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    fetchList();
  }, []);

  const generateDescription = async () => {
    setLoadingDesc(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/product/generate-description",
        { name }
      );
      if (response.data.success) {
        setDescription(response.data.description);
        toast.success("Mô tả đã được tạo tự động!");
      } else {
        toast.error("Không thể tạo mô tả. Thử lại sau!");
      }
    } catch (error) {
      toast.error("Lỗi khi tạo mô tả!");
    }
    setLoadingDesc(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Hình</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
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
  <p className="mb-2">Mô tả     <button
      type="button"
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition sm:w-auto w-full sm:ml-2"
      onClick={generateDescription}
      disabled={loadingDesc}
    >
      {loadingDesc ? "Đang tạo..." : "Tạo mô tả tự động"}
    </button></p>
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <textarea
      onChange={(e) => setDescription(e.target.value)}
      value={description}
      className="w-full max-w-[500px] px-3 py-2 min-h-[100px] flex-1 border border-gray-300 rounded"
      placeholder="Nhập mô tả"
      required
    />
  </div>
</div>



      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Loại</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            {categorylist?.map((category, index) => (
              <option key={category._id || index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Phụ</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
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
            type="Number"
            placeholder="200.000đ"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Size</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-blue-500 text-black" : "bg-slate-200"
              } px-3 py-2 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-blue-500 text-black" : "bg-slate-200"
              } px-3 py-2 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-blue-500 text-black" : "bg-slate-200"
              } px-3 py-2 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-blue-500 text-black" : "bg-slate-200"
              } px-3 py-2 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-blue-500 text-black" : "bg-slate-200"
              } px-3 py-2 cursor-pointer`}
            >
              XXL
            </p>
          </div>
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
        Thêm
      </button>
    </form>
  );
};

export default Add;
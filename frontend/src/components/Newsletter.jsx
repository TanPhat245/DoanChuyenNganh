import React from "react";

const Newsletter = () => {
  const onSubmitHandler = () => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Đăng ký ngay và được giảm giá 20%
      </p>
      <p className="text-gray-400 mt-3">Uy tín - Chất lượng - Thời thượng</p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border-[1px] pl-3"
        type="text"
      >
        <input
          className="w-full sm:flex-1 outline-none "
          type="email"
          placeholder="Nhập email của bạn tại đây."
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 hover:opacity-80 rounded-[4px]"
        >
          <span className="text-[1.4rem]">GỬI</span>
        </button>
      </form>
    </div>
  );
};

export default Newsletter;

import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Newsletter from "../components/Newsletter";

const About = () => {
  return (
    <div>
      <div className="text-2xl font-bold text-center pt-8 border-t border-gray-300">
        <Title text1={"VỀ"} text2={"CHÚNG TÔI"} />
      </div>
      
      <div className="my-10 flex flex-col md:flex-row gap-16 items-center">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-lg"
          src={assets.about_img}
          alt="T1 Team Apparel"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Tại T1, chúng tôi không chỉ bán quần áo – chúng tôi mang đến cho bạn cơ hội thể hiện niềm đam mê với đội tuyển T1 qua những bộ trang phục chính thức chất lượng cao. Mỗi chiếc áo đều được thiết kế với sự tỉ mỉ, mang đậm tinh thần chiến đấu của những người hâm mộ.
          </p>
          <p>
            Sản phẩm của chúng tôi không chỉ đẹp mắt mà còn mang đến sự thoải mái tuyệt đối cho bạn. Hãy là một phần của đội tuyển T1, không chỉ trong lòng mà còn qua những bộ trang phục đầy phong cách.
          </p>
          <b className="text-gray-800 text-lg">Tầm nhìn và sứ mệnh của chúng tôi</b>
          <p>
            Chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng cao, đáp ứng mọi nhu cầu của các fan hâm mộ. Từ chất liệu đến thiết kế, mỗi sản phẩm đều được chăm chút tỉ mỉ, mang lại trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.
          </p>
        </div>
      </div>

      <div className="text-xl font-semibold py-4">
        <Title text1={"TẠI SAO"} text2={"CHỌN CHÚNG TÔI?"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
        <div className="border px-8 py-12 rounded-lg shadow-lg flex flex-col items-center gap-5">
          <b className="text-xl text-blue-600">Siêu chất lượng</b>
          <p>
            Các sản phẩm của chúng tôi được làm từ chất liệu cao cấp, đảm bảo sự bền bỉ và cảm giác thoải mái tối ưu. Dù bạn ở đâu, áo của T1 luôn theo bạn trong mọi cuộc hành trình.
          </p>
        </div>
        <div className="border px-8 py-12 rounded-lg shadow-lg flex flex-col items-center gap-5">
          <b className="text-xl text-blue-600">100% Cotton</b>
          <p>
            Mỗi chiếc áo đều được làm từ 100% cotton tự nhiên, mang đến cảm giác mềm mại và dễ chịu cho người mặc. Bạn có thể tự tin vận động mà không lo bất kỳ sự khó chịu nào.
          </p>
        </div>
        <div className="border px-8 py-12 rounded-lg shadow-lg flex flex-col items-center gap-5">
          <b className="text-xl text-blue-600">Bo Cổ Dày Dặn</b>
          <p>
            Với thiết kế bo cổ dày dặn, sản phẩm của T1 không chỉ đảm bảo độ bền cao mà còn tạo nên vẻ đẹp thể thao, mạnh mẽ, giúp bạn tự tin tỏa sáng ở mọi nơi.
          </p>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default About;

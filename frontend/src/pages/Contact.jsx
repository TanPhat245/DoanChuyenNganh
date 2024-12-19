import React from "react";
import Title from "../components/Title";
import Newsletter from "../components/Newsletter";
import { SmartPhoneIcon, EmailIcon, HomeIcon } from "../components/icon";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"KẾT NỐI"} text2={"VỚI CHÚNG TÔI"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <div>
          <iframe
            className="rounded-lg"
            title="Forever. Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.953999520999!2d106.67529067316896!3d10.738028859904643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fad027e3727%3A0x2a77b414e887f86d!2zMTgwIMSQLiBDYW8gTOG7lywgUGjGsOG7nW5nIDQsIFF14bqtbiA4LCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1729408748748!5m2!1svi!2s"
            width="500px"
            height="490px"
            loading="lazy"
          ></iframe>
        </div>
        <div className="flex flex-col  items-start mt-[8px]">
          <i className="text-xl">
            T1. luôn lắng nghe và tiếp nhận mọi ý kiến ​đóng góp của bạn.
            Bạn có thể tìm thấy thông tin liên lạc và vị trí của mình như bên
            dưới.
          </i>
          <div className="flex flex-col mt-[120px]">
            <div className="flex">
              <HomeIcon />
              <span className="ml-[10px]">
                180 Cao Lỗ, phường 04, quận 08, thành phố Hồ Chí Minh
              </span>
            </div>
            <div className="flex mt-[15px]">
              <EmailIcon />
              <a
                href="mailto:Hvd102020iku@gmail.com"
                className="underline ml-[10px]"
              >
                Hvd102020iku@gmail.com
              </a>
            </div>
            <div className="flex  mt-[15px]">
              <SmartPhoneIcon />
              <a href="tel:+0147258369" className="underline ml-[10px]">
                01 4725 8369
              </a>
            </div>
          </div>
          <span className="font-semibold text-xl text-gray-600 mt-[80px] mb-[18px]">
            Hệ thống cửa hàng
          </span>
          <ul className="list-disc">
            <div className="ml-[20px]">
              <li>HCM - Q.8: 180 Cao Lỗ</li>
              <li>HCM - Q.Tân Phú: 1041 Lũy Bán Bích</li>
              <li>HCM - Q.1: 26 Lý Tự Trọng (TNP)</li>
              <li>ĐÀ LẠT - 11 Khu Hoà Bình, P.1</li>
            </div>
          </ul>
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default Contact;

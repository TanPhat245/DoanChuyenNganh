import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src="https://shop-t1-na.gg/cdn/shop/files/T1_Logo_Vector__e2012c_130x.png?v=1662060200" className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            T1 Entertainment & Sports is a global esports joint venture that owns and operates the ultra-successful T1 League of Legends (LoL) Champions Korea (LCK) team, along with teams in competitive gaming segments that include Dota 2, Super Smash Bros., Valorant, Wild Rift, Overwatch Contenders, Splitgate. Building upon the rich legacy of SKT T1, T1 will expand its teams globally, celebrate new victories, and create even more opportunities for fans to embrace T1’s gaming culture, content, and players in every corner of the world.            </p>
        </div>

            <div>
                <p className='text-xl font-medium mb-5'>CỬA HÀNG</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Trang chủ</li>
                    <li>Về chúng tôi</li>
                    <li>Giao hàng</li>
                    <li>Chính sách đổi trả</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>Liên hệ</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>0375567352</li>
                    <li>phat_liv245@gmail.com</li>
                </ul>
            </div>

      </div>
        
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ tanphat.com - All right Resverd</p>
        </div>
    </div>
  )
}

export default Footer

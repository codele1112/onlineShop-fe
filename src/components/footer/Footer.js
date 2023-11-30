import React from "react";
import icons from "../../ultils/icons";

const Footer = () => {
  const { MdEmail } = icons;
  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className=" flex flex-col  text-white flex-1 ">
            <span className=" md:text-[10px] text-[20px]">
              SIGN UP TO NEWSLETTER
            </span>
            <small className=" md:text-[8px] text-[13px]">
              Subcribe now and recieve weekly newsletter
            </small>
          </div>
          <div className=" md:flex-2 flex-1  flex items-center ">
            <input
              type="text"
              className="p-4 md:p-2 pr-0  rounded-l-full w-full bg-[#f8b400] outline-none text-gray-100 placeholder:text-gray-100 placeholder:text-sm  placeholder:italic placeholder:opacity-50"
              placeholder="Email address"
            />
            <div className="h-[56px] w-[56px] bg-[#f8b400] md:h-[40px] rounded-r-full  flex items-center justify-center">
              <MdEmail size={18} color="#fff" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[407px] w-full bg-gray-600 flex items-center justify-center text-white text-[13px] lg:px-3">
        <div className="w-main md:w-[390px] flex ">
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px]  text-[15px] font-medium border-l-2 border-main pl-[15px]">
              ABOUT US
            </h3>
            <span className="md:invisible">
              <span>Address: </span>
              <span className="opacity-70">
                <p>F12 KQH Hoang Dieu, Ward 5,</p>
                <p>Hoang Dieu Street, Da Lat City</p>
              </span>
            </span>

            <span className="md:invisible">
              <span>Phone: </span>
              <span className="opacity-70">(+1800) 567899xx</span>
            </span>

            <span className="md:invisible">
              <span>Mail: </span>
              <span className="opacity-70">soapsandscents@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2 md:hidden">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2  border-main pl-[15px]">
              INFORMATION
            </h3>
            <span className="opacity-70">Typography</span>
            <span className="opacity-70">Store Location</span>
            <span className="opacity-70">Today's Deals</span>
            <span className="opacity-70">Contacts</span>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2  border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span className="opacity-70 md:invisible">Help</span>
            <span className="opacity-70 md:invisible">Shipping & Return</span>
            <span className="opacity-70 md:invisible">FAQs</span>
            <span className="opacity-70 md:invisible">Testimonials</span>
          </div>

          <div className="flex-1 flex flex-col md:hidden lg:hidden gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2  border-main pl-[15px]">
              #SOAPS&SCENTS
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

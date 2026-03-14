import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ResponsiveImageSection = ({ productColors, selectedColor }) => {
  const filteredImages = productColors.find(
    (item) => item.color === selectedColor
  )?.image_urls || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="mx-auto w-full md:w-11/12">
      <div className="hidden md:block space-y-2">
        {filteredImages.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt="Product"
            className="w-full rounded-xl"
          />
        ))}
      </div>
      <div className="block md:hidden">
        <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/85 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <Slider {...settings}>
            {filteredImages.map((url, idx) => (
              <div key={idx}>
                <img
                  src={url}
                  alt="Product"
                  className="h-[300px] w-full rounded-[20px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] object-contain p-4"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveImageSection;

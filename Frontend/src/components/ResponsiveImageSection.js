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
    <div className="w-full md:w-11/12 mx-auto">
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
        <Slider {...settings}>
          {filteredImages.map((url, idx) => (
            <div key={idx}>
              <img
                src={url}
                alt="Product"
                className="w-full h-64 object-contain rounded-xl"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ResponsiveImageSection;

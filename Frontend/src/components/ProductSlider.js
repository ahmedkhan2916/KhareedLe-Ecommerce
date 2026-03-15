import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { fetchData, fetchProducts } from '../store/dataSlice.js';
import "../assets/Style/productSlider.css";

function ProductSlider() {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector((state) => state.slideproducts);
  const cardsRef = useRef([]);

  const handleClick = (event) => {
    const productId = event.currentTarget.getAttribute('data-id');
    dispatch(fetchData(productId));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const handlers = [];

    cardsRef.current.forEach((card) => {
      if (!card) return;

      const onEnter = () => {
        gsap.to(card, {
          y: -30,
          scale: 1.12,
          rotateX: 5,
          rotateZ: 2,
          zIndex: 50,
          duration: 0.1,
          ease: 'power3.out',
          boxShadow: '0 25px 40px rgba(0, 0, 0, 0.3)',
        });
      };

      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateZ: 0,
          zIndex: 10,
          duration: 0.1,
          ease: 'power2.inOut',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
        });
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ card, onEnter, onLeave });
    });

    return () => {
      handlers.forEach(({ card, onEnter, onLeave }) => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [products]);

  if (loading) return <div className="pl-4 text-base sm:pl-16 sm:text-xl">Loading...</div>;
  if (error) return <div className="pl-4 text-base text-red-500 sm:pl-16 sm:text-xl">Error: {error}</div>;

  return (
    <div className="relative z-50 mt-10">
      <div className="relative z-50 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="py-6 sm:py-10">
          <div className="relative z-50 flex w-fit snap-x snap-mandatory gap-3 px-1 overflow-visible sm:gap-16 sm:px-4">
            {Array.isArray(products) &&
              products.map((item, index) => (
                <div
                  key={item._id}
                  data-id={item._id}
                  onClick={handleClick}
                  ref={(element) => {
                    cardsRef.current[index] = element;
                  }}
                  className="relative z-10 w-[156px] min-w-[156px] cursor-pointer rounded-2xl bg-white snap-center transition-transform duration-300 sm:w-[120px] sm:min-w-[120px] sm:rounded-xl"
                >
                  <Link to={`/product/${item._id}`}>
                    <div
                      className="h-[132px] rounded-t-2xl bg-cover bg-center sm:h-[100px] sm:rounded-t-xl"
                      style={{ backgroundImage: `url(${item.product_image})` }}
                    />
                    <div className="rounded-b-2xl bg-gray-900 p-2.5 text-center text-xs text-white sm:rounded-b-xl sm:p-2">
                      <h3 className="min-h-[2.5rem] line-clamp-2 font-semibold leading-tight sm:min-h-0">
                        {item.product_name}
                      </h3>
                      <span className="mt-1 block font-bold text-green-400">
                        Rs. {item.price}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;

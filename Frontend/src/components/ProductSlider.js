import React, { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { fetchData, fetchProducts } from '../store/dataSlice.js';
import "../assets/Style/productSlider.css";

function ProductSlider() {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector((state) => state.slideproducts);
  const cardsRef = useRef([]);

  const smartphoneProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    const smartphoneMatcher =
      /iphone|samsung|galaxy|pixel|oneplus|xiaomi|redmi|vivo|oppo|realme|motorola|phone/i;

    return products.filter((item) => {
      const category = String(item?.category || "");
      const productName = String(item?.product_name || "");

      return /smart/i.test(category) || smartphoneMatcher.test(productName);
    });
  }, [products]);

  const handleClick = (event) => {
    const productId = event.currentTarget.getAttribute('data-id');
    dispatch(fetchData(productId));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const handlers = [];
    const canHover = typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches;

    if (!canHover) {
      return undefined;
    }

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
  }, [smartphoneProducts]);

  if (loading) return <div className="pl-4 text-base sm:pl-16 sm:text-xl">Loading...</div>;
  if (error) return <div className="pl-4 text-base text-red-500 sm:pl-16 sm:text-xl">Error: {error}</div>;

  return (
    <div className="relative z-50 mt-4 sm:mt-6">
      <div className="mb-4 flex items-center justify-between gap-3 px-1 sm:mb-5 sm:px-2">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400 sm:text-sm">
          Swipe Through Premium Picks
        </p>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
          {smartphoneProducts.length} Phones
        </span>
      </div>

      <div className="relative z-50 overflow-x-auto pb-3 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="py-2 sm:py-6">
          <div className="relative z-50 flex w-max snap-x snap-mandatory gap-4 px-1.5 overflow-visible sm:gap-8 sm:px-3">
            {smartphoneProducts.map((item, index) => (
                <div
                  key={item._id}
                  data-id={item._id}
                  onClick={handleClick}
                  ref={(element) => {
                    cardsRef.current[index] = element;
                  }}
                  className="relative z-10 w-[72vw] min-w-[72vw] max-w-[260px] cursor-pointer snap-start overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.10)] transition-transform duration-300 sm:w-[190px] sm:min-w-[190px] sm:max-w-none sm:rounded-[22px]"
                >
                  <Link to={`/product/${item._id}`}>
                    <div
                      className="h-[210px] rounded-t-[24px] bg-contain bg-center bg-no-repeat sm:h-[180px] sm:rounded-t-[22px]"
                      style={{ backgroundImage: `url(${item.product_image})` }}
                    />
                    <div className="rounded-b-[24px] bg-slate-950 px-4 py-3 text-center text-white sm:rounded-b-[22px]">
                      <h3 className="min-h-[2.8rem] line-clamp-2 text-sm font-semibold leading-tight sm:min-h-[3rem] sm:text-base">
                        {item.product_name}
                      </h3>
                      <span className="mt-2 block text-sm font-bold text-green-400 sm:text-base">
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

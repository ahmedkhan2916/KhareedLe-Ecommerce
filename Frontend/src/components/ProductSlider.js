import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchData, fetchProducts } from '../store/dataSlice.js';
import "../assets/Style/productSlider.css";

function ProductSlider() {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector((state) => state.slideproducts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

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
    if (currentIndex > smartphoneProducts.length - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex, smartphoneProducts.length]);

  const goToSlide = (index) => {
    if (smartphoneProducts.length === 0) {
      return;
    }

    const lastIndex = smartphoneProducts.length - 1;

    if (index < 0) {
      setCurrentIndex(lastIndex);
      return;
    }

    if (index > lastIndex) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(index);
  };

  const handleTouchStart = (event) => {
    const startPoint = event.changedTouches[0]?.clientX || 0;
    setTouchStartX(startPoint);
    setTouchEndX(startPoint);
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.changedTouches[0]?.clientX || 0);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) < 40) {
      return;
    }

    if (swipeDistance > 0) {
      goToSlide(currentIndex + 1);
      return;
    }

    goToSlide(currentIndex - 1);
  };

  if (loading) return <div className="pl-4 text-base sm:pl-16 sm:text-xl">Loading...</div>;
  if (error) return <div className="pl-4 text-base text-red-500 sm:pl-16 sm:text-xl">Error: {error}</div>;
  if (smartphoneProducts.length === 0) return null;

  return (
    <div className="relative z-50 mt-3 sm:mt-5">
      <div className="mb-3 flex items-center justify-between gap-3 px-1 sm:mb-4 sm:px-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-xs">
          Flagship Carousel
        </p>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-3 sm:text-xs">
          {smartphoneProducts.length} Phones
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_100%)] p-3 shadow-[0_14px_40px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-16" />

        <div className="mb-3 flex items-center justify-end gap-2 sm:mb-4">
          <button
            type="button"
            onClick={() => goToSlide(currentIndex - 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
            aria-label="Previous phone"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => goToSlide(currentIndex + 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
            aria-label="Next phone"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {smartphoneProducts.map((item) => (
              <div key={item._id} className="w-full flex-none">
                <div
                  data-id={item._id}
                  onClick={handleClick}
                  className="mx-auto w-full max-w-[280px] cursor-pointer overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_18px_30px_rgba(15,23,42,0.08)] sm:max-w-[340px]"
                >
                  <Link to={`/product/${item._id}`}>
                    <div className="flex h-[220px] items-center justify-center bg-[radial-gradient(circle_at_top,#fff7ed_0%,#ffffff_70%)] p-5 sm:h-[250px]">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="max-h-full w-full object-contain"
                      />
                    </div>
                    <div className="border-t border-slate-100 px-4 py-4 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Premium Pick
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-6 text-slate-950 sm:text-lg">
                        {item.product_name}
                      </h3>
                      <span className="mt-2 block text-base font-bold text-emerald-600 sm:text-lg">
                        Rs. {item.price}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {smartphoneProducts.map((item, index) => (
            <button
              key={item._id}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-7 bg-slate-900" : "w-2.5 bg-slate-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;

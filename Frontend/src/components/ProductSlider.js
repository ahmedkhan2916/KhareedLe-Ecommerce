import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchProducts } from '../store/dataSlice.js';
import gsap from 'gsap';
import "../assets/Style/productSlider.css";

function ProductSlider() {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector(state => state.slideproducts);
  const cardsRef = useRef([]);

  const handleClick = (event) => {
    const id = event.currentTarget.getAttribute('data-id');
    dispatch(fetchData(id));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    const handlers = [];

    cardsRef.current.forEach((card) => {
      if (!card) return;

      const onEnter = () => {
        gsap.to(card, {
          y: -50,                  // strong upward motion
          scale: 1.15,             // float up effect
          rotateX: 5,              // subtle 3D tilt
          rotateZ: 2,              // slight rotation
          duration: 0.1,
          ease: "power3.out",
          boxShadow: "0 30px 50px rgba(0, 0, 0, 0.3)",
        });
      };

      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateZ: 0,
          duration: 0.1,
          ease: "power2.inOut",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
        });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      handlers.push({ card, onEnter, onLeave });
    });

    return () => {
      handlers.forEach(({ card, onEnter, onLeave }) => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [products]);

  if (loading) return <div className='pl-16 text-xl'>Loading...</div>;
  if (error) return <div className='pl-16 text-xl text-red-500'>Error: {error}</div>;

  return (
<div className="mt-10 overflow-x-auto scrollbar-hide relative z-0">
  <div className="flex space-x-4 px-4 py-2 snap-x snap-mandatory w-fit overflow-visible gap-16">
    {products.map((item, index) => (
      <div
        key={item._id}
        data-id={item._id}
        onClick={handleClick}
        ref={el => cardsRef.current[index] = el}
        className="bg-white rounded-xl cursor-pointer w-[120px] min-w-[120px] snap-center transition-transform duration-300 z-[8000] "
      >
        <Link to={`/product/${item._id}`}>
          <div
            className="h-[100px] bg-cover bg-center rounded-t-xl"
            style={{ backgroundImage: `url(${item.product_image})` }}
          />
          <div className="text-center p-2 bg-gray-900 text-white rounded-b-xl text-xs">
            <h3 className="font-semibold leading-tight">{item.product_name}</h3>
            <span className="text-green-400 font-bold block mt-1">₹{item.price}</span>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

  );
}

export default ProductSlider;

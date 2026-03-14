import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Check, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import {
  fetchData,
  fetchReviewData,
  fetchBagTotal2,
  fetchAddToBag,
  changeButtonText,
  resetButtonText,
  increment,
  setSimiliarProduct,
  setProductData,
} from '../store/dataSlice.js';
import Header from '../components/HeaderChange.js';
import Footer from '../components/Footer.js';
import BuyButton from '../components/BuyButton.js';
import ReviewSection from '../components/ReviewSection.js';
import ResponsiveImageSection from '../components/ResponsiveImageSection';
import star from '../assets/Brandlogo/rating.png';
import { BASE_URL } from '../config/config.js';

function Purchasing_page() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.data.data);
  const error = useSelector((state) => state.data.error);
  const loading = useSelector((state) => state.data.loading);
  const product = useSelector((state) => state.product.product);
  const token = useSelector((state) => state.userAuth.token);
  const UserID = useSelector((state) => state.fetchID.UserID);
  const totalBag = useSelector((state) => state.fetchBagTotalStore.totalBag);
  const buttonText = useSelector((state) => state.changeButtonText.buttonText);

  const [productColors, setProductColors] = useState([]);
  const [color, setColor] = useState('');
  const [productSlice2, setProductSlice2] = useState({});
  const [buttonClick2, setButtonClick2] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [magnifier, setMagnifier] = useState({
    visible: false,
    backgroundPosition: '50% 50%',
  });
  const [picUrl, setPicUrl] = useState('');
  const [activePreview, setActivePreview] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('128 GB');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchData(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!UserID || !id) return;
    dispatch(changeButtonText({ userId: UserID, productId: id }));
    setButtonClick2(buttonText === 200);
  }, [UserID, id, buttonText, dispatch]);

  useEffect(() => {
    if (!loading && data) {
      setProductColors(data.product_color || []);
      setColor(data.product_color?.[0]?.color || '');
    }
  }, [loading, data]);

  const activeColorImages = useMemo(() => {
    return productColors.find((item) => item.color === (color || 'Black'))?.image_urls || [];
  }, [productColors, color]);

  useEffect(() => {
    if (activeColorImages.length > 0) {
      setActivePreview(activeColorImages[0]);
    }
  }, [activeColorImages]);

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setProductSlice2(product);
    }
  }, [product]);

  useEffect(() => {
    if (UserID) {
      dispatch(fetchBagTotal2({ ID: UserID }));
    }
  }, [dispatch, UserID]);

  useEffect(() => {
    dispatch(increment(totalBag));
  }, [dispatch, totalBag]);

  useEffect(() => {
    if (data && data.price) {
      axios.get(`${BASE_URL}/users/update?value=${data.price}`).then((res) => {
        if (res.data) dispatch(setSimiliarProduct(res.data));
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data && data.product_image && data.product_name) {
      dispatch(fetchReviewData());
      dispatch(
        setProductData({
          image: data.product_image,
          name: data.product_name,
          details: data.product_details,
          description: data.description,
          price: data.price,
          rating: data.rating,
          id: data._id,
        })
      );
    }
  }, [data, dispatch]);

  const handleAddtoCart = async () => {
    if (!token) return navigate('/users/login');

    try {
      dispatch(resetButtonText());
      await dispatch(fetchAddToBag({ userId: UserID, productId: id, Signal: false }));
      await dispatch(changeButtonText({ userId: UserID, productId: id }));
      setButtonClick2(true);
      await dispatch(fetchBagTotal2({ ID: UserID }));
    } catch (addToCartError) {
      console.log('Add to cart failed:', addToCartError);
    }
  };

  const handleColorClick = (selectedColor) => setColor(selectedColor);

  const handleMouseMove = (event) => {
    if (isMobile) return;

    const { left, top, width, height } = event.target.getBoundingClientRect();
    setPicUrl(event.target.src);

    const x = event.clientX - left;
    const y = event.clientY - top;
    const backgroundX = (x / width) * 100;
    const backgroundY = (y / height) * 100;

    setMagnifier({
      visible: true,
      backgroundPosition: `${backgroundX}% ${backgroundY}%`,
    });
  };

  const handleMouseLeave = () => {
    setMagnifier((prev) => ({ ...prev, visible: false }));
  };

  if (loading) return <p className="mt-20 text-center">Loading...</p>;
  if (error) return <p className="mt-20 text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_26%,#fff7ed_100%)]">
      <Header />

      <div className="px-3 pt-24 md:px-8 md:pt-32 lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 md:gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative">
              {isMobile ? (
                <ResponsiveImageSection productColors={productColors} selectedColor={color} />
              ) : (
                <>
                  {activePreview && (
                    <div className="rounded-[28px] border border-white/80 bg-white/85 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-4 md:rounded-[32px] md:p-5 md:shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                      <img
                        src={activePreview}
                        alt="product"
                        className="h-[360px] w-full rounded-[20px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] object-contain p-4 transition duration-300 sm:h-[420px] sm:rounded-[24px] sm:p-6 md:h-[520px]"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                    {activeColorImages.map((url, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActivePreview(url)}
                        className={`overflow-hidden rounded-xl border bg-white p-1 transition sm:rounded-2xl ${
                          activePreview === url
                            ? 'border-orange-500 shadow-md'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img
                          src={url}
                          alt="product preview"
                          className="h-16 w-full rounded-lg bg-slate-50 object-cover sm:h-20 sm:rounded-xl"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {magnifier.visible && (
                <div
                  className="fixed left-[72%] top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-2xl border bg-white shadow-xl xl:block"
                  style={{
                    width: '34vw',
                    height: '52vh',
                    backgroundImage: `url(${picUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: magnifier.backgroundPosition,
                    backgroundSize: '220%',
                    cursor: 'zoom-out',
                  }}
                  onClick={handleMouseLeave}
                />
              )}
            </div>

            <div className="rounded-[28px] border border-white/80 bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-5 md:rounded-[32px] md:p-8 md:shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-4 md:gap-5">
                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-700 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]">
                    <Sparkles size={14} />
                    Product Spotlight
                  </span>
                  <h1 className="text-[2rem] font-semibold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
                    {productSlice2.name}
                  </h1>
                  <p className="text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                    A cleaner product page focused on the essentials: gallery, key details,
                    variants, and direct buying actions.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                    <span>{productSlice2.rating}</span>
                    <img src={star} className="h-4" alt="star" />
                  </div>
                  <span className="text-sm text-slate-500">Top rated device</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    <Check size={14} />
                    Ready to order
                  </span>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Price</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    ₹ {productSlice2.price}
                  </p>
                </div>

                <p className="rounded-[20px] bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 sm:rounded-[24px] sm:px-5 sm:py-4 sm:leading-7">
                  {productSlice2.details}
                </p>
                <p className="text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                  {productSlice2.description}
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Truck size={16} className="text-orange-500" />
                      Fast Delivery
                    </div>
                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Quick dispatch on available stock.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      Genuine Product
                    </div>
                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Verified product quality and safer checkout.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Sparkles size={16} className="text-cyan-500" />
                      Simple Choices
                    </div>
                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Gallery, colors, and storage kept straightforward.
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <BuyButton />
                  </div>
                  {buttonClick2 ? (
                    <button
                      className="w-full flex-1 rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                      onClick={() => navigate('/users/Cart')}
                    >
                      Go to Cart
                    </button>
                  ) : (
                    <button
                      className="w-full flex-1 rounded-2xl bg-green-600 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-green-700"
                      onClick={handleAddtoCart}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="mb-2 text-base font-medium">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {productColors.map((item, index) => (
                      <div
                        key={index}
                        className={`h-12 w-12 cursor-pointer rounded-xl border bg-cover transition duration-200 sm:h-14 sm:w-14 sm:rounded-2xl ${
                          color === item.color
                            ? 'border-orange-500 ring-2 ring-orange-200'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        style={{ backgroundImage: `url(${item.image_urls?.[0]})` }}
                        onClick={() => handleColorClick(item.color)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 mt-4 text-base font-medium">Storage</h3>
                  <div className="flex flex-wrap gap-3">
                    {['128 GB', '256 GB'].map((storage) => {
                      const isActive = selectedStorage === storage;

                      return (
                        <button
                          key={storage}
                          type="button"
                          onClick={() => setSelectedStorage(storage)}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${
                            isActive
                              ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm'
                              : 'border-gray-300 bg-white text-gray-700 hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          {storage}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ReviewSection />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Purchasing_page;

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import {
  fetchData,
  fetchReviewData,
  fetchUserID,
  fetchBagTotal2,
  fetchAddToBag,
  changeButtonText,
  resetButtonText,
  increment,
  setSimiliarProduct,
  setProductData
} from '../store/dataSlice.js';
import Header from '../components/HeaderChange.js';
import Footer from '../components/Footer.js';
import BuyButton from '../components/BuyButton.js';
import ReviewSection from '../components/ReviewSection.js';
import ResponsiveImageSection from '../components/ResponsiveImageSection';
import star from '../assets/Brandlogo/rating.png';
import '../assets/Style/purchasingPage.css';
import {BASE_URL} from '../config/config.js';

function Purchasing_page() {
  const cookie = new Cookies();
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
  const statusButton=useSelector((state)=>state.changeButtonText.statusButtonText);
  const [productColors, setProductColors] = useState([]);
  const [color, setColor] = useState('');
  const [productSlice2, setProductSlice2] = useState({});
  const [buttonClick2, setButtonClick2] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // const [magnifier, setMagnifier] = useState({});
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
  }, [id]);

// 1. Dispatch when ID changes
useEffect(() => {

 
}, [UserID, id, dispatch]);

// When buttonText changes (from Redux), update UI accordingly
useEffect(() => {
  // setButtonClick2(false); // Reset button state initially
   if (!UserID || !id) return;
  dispatch(changeButtonText({ userId: UserID, productId: id }));
  // console.log("button text and status text",buttonText,statusButton)
  if (buttonText === 200 ) {
    setButtonClick2(true); // product is already in cart
  } else {
    setButtonClick2(false);
  }
}, [buttonText,dispatch]);




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
  }, [UserID]);

  useEffect(() => {
    dispatch(increment(totalBag));
  }, [totalBag]);

  // useEffect(() => {
  //   if (!UserID || !id) return;
  //   dispatch(changeButtonText({ userId: UserID, productId: id }));
  // }, [dispatch, UserID, id]);

  useEffect(() => {
    if (data && data.price) {
      axios.get(`${BASE_URL}/users/update?value=${data.price}`).then((res) => {
        if (res.data) dispatch(setSimiliarProduct(res.data));
      });
    }
  }, [data]);

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
          id: data._id
        })
      );
    }
  }, [data]);

  const handleAddtoCart = async () => {
    if (!token) return navigate('/users/login');

    try {
      dispatch(resetButtonText());
      await dispatch(fetchAddToBag({ userId: UserID, productId: id, Signal: false }));
      await dispatch(changeButtonText({ userId: UserID, productId: id }));
      setButtonClick2(true);
      await dispatch(fetchBagTotal2({ ID: UserID }));
    } catch (error) {
      console.log("Add to cart failed:", error);
    }
  };

  const handleBuyButton = () => {
    if (UserID) {
      navigate('/users/shipping');
    }
  };

  const handleColorClick = (color) => setColor(color);

 const handleMouseMove = (e) => {
  if (isMobile) return;

  const { left, top, width, height } = e.target.getBoundingClientRect();
  setPicUrl(e.target.src);

  const x = e.clientX - left;
  const y = e.clientY - top;
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

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="px-4 md:px-12 pt-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isMobile ? (
            <ResponsiveImageSection productColors={productColors} selectedColor={color} />
          ) : (
            <div className="relative">
              {activePreview && (
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <img
                    src={activePreview}
                    alt="product"
                    className="w-full rounded-2xl object-contain transition duration-300"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              )}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {activeColorImages.map((url, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActivePreview(url)}
                    className={`overflow-hidden rounded-2xl border p-1 transition ${
                      activePreview === url
                        ? 'border-green-500 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={url} alt="product preview" className="h-20 w-full rounded-xl object-cover" />
                  </button>
                ))}
              </div>
  
 
            </div>
          )}

                    {magnifier.visible && (
  <div
    className="fixed top-1/2 left-[72%] transform -translate-x-1/2 -translate-y-1/2 z-50 hidden bg-white shadow-xl rounded-2xl border overflow-hidden xl:block"
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

          <div className="flex flex-col gap-5">
            <h1 className="text-2xl md:text-3xl font-semibold">{productSlice2.name}</h1>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                <span>{productSlice2.rating}</span>
                <img src={star} className="h-4" alt="star" />
              </div>
              <span className="text-sm text-slate-500">Top rated device</span>
            </div>
            <p className="text-3xl font-bold tracking-tight text-slate-900">₹ {productSlice2.price}</p>
            <p className="rounded-2xl bg-slate-50 px-4 py-3 text-gray-700">{productSlice2.details}</p>
            <p className="text-sm leading-7 text-gray-600">{productSlice2.description}</p>

            <div className="flex gap-3 w-full">
              <div className="w-1/2">
                <BuyButton />
              </div>
              {buttonClick2 ? (
                <button className="flex-1 rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800" onClick={() => navigate('/users/Cart')}>
                  Go to Cart
                </button>
              ) : (
                <button className="flex-1 rounded-2xl bg-green-600 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-green-700" onClick={handleAddtoCart}>
                  Add to Cart
                </button>
              )}
            </div>

            {/* Color Options */}
            <div>
              <h3 className="font-medium text-base mb-2">Colors</h3>
              <div className="flex gap-2">
                {productColors.map((item, index) => (
                  <div
                    key={index}
                    className={`w-14 h-14 bg-cover rounded-2xl border cursor-pointer transition duration-200 ${
                      color === item.color ? 'border-green-500 ring-2 ring-green-200' : 'border-slate-200 hover:border-slate-300'
                    }`}
                    style={{ backgroundImage: `url(${item.image_urls?.[0]})` }}
                    onClick={() => handleColorClick(item.color)}
                  ></div>
                ))}
              </div>
            </div>

            {/* Storage Options */}
            <div>
              <h3 className="font-medium text-base mt-4 mb-2">Storage</h3>
              <div className="flex gap-3">
                {['128 GB', '256 GB'].map((storage) => {
                  const isActive = selectedStorage === storage;

                  return (
                    <button
                      key={storage}
                      type="button"
                      onClick={() => setSelectedStorage(storage)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${
                        isActive
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
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

        {/* Reviews */}
        <ReviewSection />
      </div>
      <Footer />
    </div>
  );
}

export default Purchasing_page;

import React, { useEffect, useState } from 'react';
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

  const [productColors, setProductColors] = useState([]);
  const [color, setColor] = useState('');
  const [productSlice2, setProductSlice2] = useState({});
  const [buttonClick2, setButtonClick2] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [magnifier, setMagnifier] = useState({});
  const [picUrl, setPicUrl] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchData(id));
  }, [id]);

  useEffect(() => {
    if (!loading && data) {
      setProductColors(data.product_color || []);
      setColor(data.product_color?.[0]?.color || '');
    }
  }, [loading, data]);

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

  useEffect(() => {
    if (!UserID || !id) return;
    dispatch(changeButtonText({ userId: UserID, productId: id }));
  }, [dispatch, UserID, id]);

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

  const handleAddtoCart = () => {
    if (!token) return navigate('/users/login');
    dispatch(resetButtonText());
    setButtonClick2(false);
    dispatch(fetchAddToBag({ userId: UserID, productId: id, Signal: false }));
    dispatch(changeButtonText({ userId: UserID, productId: id }));
    setButtonClick2(true);
    dispatch(fetchBagTotal2({ ID: UserID }));
    dispatch(increment(totalBag));
  };

  const handleBuyButton = () => {
    if (UserID) {
      navigate('/users/shipping');
    }
  };

  const handleColorClick = (color) => setColor(color);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { top, left, width, height } = e.target.getBoundingClientRect();
    setPicUrl(e.target.src);
    const x = e.clientX - left;
    const y = e.clientY - top;
    const backgroundX = (x / width) * 100;
    const backgroundY = (y / height) * 100;
    setMagnifier({
      opacity: 1,
      top: `${y - 50}px`,
      left: `${x - 50}px`,
      backgroundPosition: `${backgroundX}% ${backgroundY}% `
    });
  };

  const handleMouseLeave = () => {
    setMagnifier({ opacity: 0 });
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="pt-28 px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isMobile ? (
            <ResponsiveImageSection productColors={productColors} selectedColor={color} />
          ) : (
            <div className="relative">
              {productColors
                .filter((item) => item.color === (color || 'Black'))
                .map((item) =>
                  item.image_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt="product"
                      className="mb-4 rounded"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    />
                  ))
                )}
              <div
                className="magnifier absolute w-24 h-24 border border-gray-400 rounded hidden md:block pointer-events-none"
                style={{
                  ...magnifier,
                  backgroundImage: `url(${picUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '200%',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  opacity: magnifier.opacity || 0
                }}
              ></div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold">{productSlice2.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-lg">Ratings: {productSlice2.rating}</span>
              <img src={star} className="h-5" alt="star" />
            </div>
            <p className="text-xl font-bold">₹ {productSlice2.price}</p>
            <p className="text-gray-700">{productSlice2.details}</p>
            <p className="text-sm text-gray-600">{productSlice2.description}</p>

            <div className="flex gap-2 w-full">
              <BuyButton />
              {buttonClick2 ? (
                <button className="flex-1 bg-green-600 text-white rounded-lg py-2" onClick={() => navigate('/users/shipping')}>
                  Go to Cart
                </button>
              ) : (
                <button className="flex-1 bg-green-600 text-white rounded-lg py-2" onClick={handleAddtoCart}>
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
                    className="w-14 h-14 bg-cover rounded border cursor-pointer"
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
                <div className="border px-3 py-1 rounded text-blue-500 border-blue-400">128 GB</div>
                <div className="border px-3 py-1 rounded text-gray-700 border-gray-300">256 GB</div>
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

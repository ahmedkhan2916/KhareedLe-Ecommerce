import {Router} from "express";
import { SignUp ,Login,Logout,UploadPost,getData,sendDataById,update,user_review,fetch_userReviews,userSearch,updateProductImage,chatbotResponse, addCountItems, showTotalItemsCount,fetchBagItems, deleteCountItems,address, changeText, totalItemsPrice, refreshTokenHandler, handleUserIDFetch,getProductIdFromCookies,searchHistory,fetchMostSearchedProducts,updatePricesSP,Gifts_DB,Only_refresh_Token_Access_Token_Handler,AddAndRemoveQuantity,RazorPay_Gateway_Integration} from "../controllers/user.controller.js";
// import runSample from "../controllers/chatbotmodel.js"
import verifyToken from "../middlewares/verifyToken.js"
const router=Router();

router.route("/signup").post(SignUp)
router.route("/login").post(Login)
router.route("/logout").post(Logout)
router.route("/uploadpost").post(UploadPost);
router.route("/getdata").get(getData);
router.route("/postdetails").post(sendDataById);
router.route("/update").get(update);
router.route("/userreview").post(user_review);
router.route("/fetchuser").get(fetch_userReviews);
router.route("/userSearch").get(userSearch);
router.route("/updateproductimage").get(updateProductImage);
router.route("/chatbotResponse").post(chatbotResponse);
router.route("/addbag").post(addCountItems);
router.route("/showtotal").post(showTotalItemsCount);
router.route("/fetchbag").post(fetchBagItems);
router.route("/deletequantity").post(deleteCountItems);
router.route("/addressadd").post(address);
router.route("/changetext").post(changeText);
router.route("/totalprice").post(totalItemsPrice);
router.route("/refresh-token-handler").post(refreshTokenHandler);
router.route("/userid-fetch").get(verifyToken,handleUserIDFetch);
router.route("/getProductId").get(getProductIdFromCookies);
router.route("/track-search").post(searchHistory);
router.route("/fetch-search-history").post(fetchMostSearchedProducts);
router.route("/update-spp").get(updatePricesSP);
router.route("/Gifts-Storage-Inventory").post(Gifts_DB);
router.route("/refresh-token-handler-access-token").post(Only_refresh_Token_Access_Token_Handler);
router.route("/inc-dec-items").post(AddAndRemoveQuantity);
router.route("/create-order").post(RazorPay_Gateway_Integration);

export {router}

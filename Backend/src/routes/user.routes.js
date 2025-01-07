import {Router} from "express";
import { SignUp ,Login,UploadPost,getData,sendDataById,update,user_review,fetch_userReviews,userSearch,updateProductImage,chatbotResponse, addCountItems, showTotalItemsCount,fetchBagItems, deleteCountItems,address, changeText, totalItemsPrice} from "../controllers/user.controller.js";
// import runSample from "../controllers/chatbotmodel.js"
const router=Router();

router.route("/signup").post(SignUp)
router.route("/login").post(Login)
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


export {router}

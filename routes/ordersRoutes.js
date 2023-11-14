import express from "express";
import { addItemtoOrder, cancelOrder, confirmOrder, createOrder, getAllOrders, getOrderByOrderId, getOrderByUserId, placeOrder, removeItemfromOrder, updateOrder } from "../controllers/ordersController.js";
import { admin,protect } from "../middlewares/authMiddleware.js";

var router = express.Router();

router.post('/getall-orders',protect,admin,getAllOrders);
router.post('/create-order',protect,createOrder);
router.post('/place-order',protect,placeOrder);
router.get('/cancel-order/:id',protect,cancelOrder);
router.post('/update-order',protect,updateOrder);
router.post('/update-order/add-item',protect,addItemtoOrder);
router.post('/update-order/remove-item',protect,removeItemfromOrder);
router.post('/get-order-by-userid',protect,getOrderByUserId);
router.get('/:id',protect,getOrderByOrderId);
router.get('/confirmOrder/:id',protect,confirmOrder);

export default router;


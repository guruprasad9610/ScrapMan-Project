import express from "express";
import { assignOrders, getAcceptedOrders, getAssignOrderByAgentId, getUnAcceptedOrRejectedOrders, outForPickup, rejectOrder, acceptOrder, recivedOrder, getAssignOrderDetails } from "../controllers/assignController.js";
import { protect, admin, agent } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/assign-order',protect,admin,assignOrders);
router.get('/:assign_id',protect,agent,getAssignOrderDetails);

router.post('/get-accepted-order',protect,admin,getAcceptedOrders);
router.post('/get-unaccepted-order',protect,admin,getUnAcceptedOrRejectedOrders);

router.post('/get-assign-order',protect,agent,getAssignOrderByAgentId);
router.get('/accept-order/:id',protect,agent,acceptOrder);
router.get('/reject-order/:id',protect,agent,rejectOrder);

router.get('/out-for-pickup/:id',protect,agent,outForPickup);
router.get('/received-order/:id',protect,agent,recivedOrder);

export default router;
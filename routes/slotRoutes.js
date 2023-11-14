import express from 'express';

import { createSlot, deleteSlot, getAllSlot, getSlotsByDate, updateSlot } from "../controllers/slotController.js";

var router = express.Router();

router.post("/create",createSlot);
router.get("/getAll",getAllSlot);
router.post("/getSlotsByDate",getSlotsByDate);
router.post("/updateSlot",updateSlot);
router.post("/deleteSlot",deleteSlot);

export default router;
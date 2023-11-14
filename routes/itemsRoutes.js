import express from 'express';
import { addItem, deleteItem, getAllItem, getItemById, updateItem } from '../controllers/itemsController.js';
import { protect,admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add',addItem);
router.post('/update',protect,admin,updateItem);
router.get('/get-items',protect,getAllItem);
router.get('/delete/:id',protect,admin,deleteItem);
router.get('/:id',protect,getItemById);

export default router;

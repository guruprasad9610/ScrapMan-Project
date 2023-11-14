import express from 'express';
import {
  getUsers,
  login,
  register,
  updateUserProfile,
  putdata,
  RetriveAll,
  getUserById,
  getAllAgents
} from '../controllers/userController.js';
import { admin, protect, agent } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/putdata', putdata);
router.post('/retriveall', RetriveAll);
router.post('/getuser', protect,admin,getUsers);
router.put('/updateProfile', protect, updateUserProfile);
// router.get('/:id',protect, getUserById );
router.get('/getAllAgents',protect, getAllAgents);
router.get('/:id',protect, getUserById );

export default router;

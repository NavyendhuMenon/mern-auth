import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/adminController.js';
import { verifyToken, verifyAdmin } from '../utils/verifyUser.js'

const router = express.Router();

router.post('/users', verifyToken, verifyAdmin, createUser)
router.get('/admin-dashboard', verifyToken, verifyAdmin,getUsers)
router.put('/users/:id',verifyToken, verifyAdmin, updateUser); 
router.delete('/users/:id',verifyToken, verifyAdmin, deleteUser);

export default router;

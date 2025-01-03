

import express from 'express'

import { verifyToken } from '../utils/verifyUser.js'
import { updateUser, deleteUser } from '../controllers/userController.js'
import { upload } from '../config/multerConfig.js'

const router = express.Router()



// router.post('/update/:id', verifyToken,updateUser)
router.post('/update/:id', verifyToken, upload.single('profilePicture'), updateUser);

router.delete('/delete/:id', verifyToken, deleteUser)

export default router
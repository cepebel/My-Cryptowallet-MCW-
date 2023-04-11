import express from 'express'
import { userController } from '../controllers/user.controller'

const router = express.Router()
router.post('/add', userController.addUser)
router.get('/all', userController.getAllUsers)
router.get('/get/:id', userController.getUserById)
router.get('/get/email/:email', userController.getUserByEmail)
router.post('/login', userController.logIn)
router.get('/ping', userController.ping)

export default router
module.exports = router

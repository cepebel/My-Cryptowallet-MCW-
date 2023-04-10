import express from 'express'
import { coinController } from '../controllers/coin.controller'

const router = express.Router()
router.post('/add', coinController.addCoin)
router.get('/all', coinController.getAllCoins)
router.get('/get/:id', coinController.getCoinById)
router.get('/get/join/:id', coinController.getJoinById)
router.get('/get/join/all', coinController.getAllJoins)
router.get('/get/join/user/:id', coinController.getUserJoins)
router.get('/getAmount/:id', coinController.checkAmount)
router.post('/updateAmount', coinController.updateAmount)
router.post('/update', coinController.updateJoin)


export default router
module.exports = router
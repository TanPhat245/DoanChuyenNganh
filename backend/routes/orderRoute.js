import express from 'express'
import {placeOrders, placeOrderStripe, placeOrderMOMO, allOrders, userOrders, updateStatusOrders} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter = express.Router()

orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatusOrders)
orderRouter.post('/place' ,authUser, placeOrders)
orderRouter.post('/stripe',authUser, placeOrderStripe)
orderRouter.post('/momo',authUser, placeOrderMOMO)
orderRouter.post('/userorders', authUser, userOrders)


export default orderRouter;
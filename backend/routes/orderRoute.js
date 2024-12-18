import express from 'express'
import {placeOrders, placeOrderStripe, placeOrderMOMO, allOrders, userOrders, updateStatusOrders} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatusOrders)
orderRouter.post('/place', placeOrders)
orderRouter.post('/stripe', placeOrderStripe)
orderRouter.post('/momo', placeOrderMOMO)
orderRouter.post('/userorders', userOrders)


export default orderRouter;
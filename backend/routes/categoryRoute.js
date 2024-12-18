import express from 'express'
import { addCategory, listCategory } from '../controllers/categoryController.js'
import adminAuth from '../middleware/adminAuth.js';


const categorytRouter = express.Router();

categorytRouter.get('/list', listCategory);
categorytRouter.post('/add', adminAuth, addCategory);


export default categorytRouter;
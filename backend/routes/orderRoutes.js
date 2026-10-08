import { Router } from 'express';
import { createOrder, listOrders, trackOrder } from '../controllers/orderController.js';
import validateOrder from '../middleware/validateOrder.js';

const router = Router();
router.get('/track/:code', trackOrder);
router.get('/', listOrders);
router.post('/', validateOrder, createOrder);
export default router;

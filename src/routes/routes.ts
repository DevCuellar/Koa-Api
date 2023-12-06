import Router from 'koa-router';
import productRoutes from './productRoutes';

const router = new Router();

router.use('/products', productRoutes.routes());

export default router;
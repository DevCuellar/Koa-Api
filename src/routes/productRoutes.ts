import productController from "../controllers/productController";
import Router from 'koa-router';

const router = new Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.postProduct);
router.put('/:id', productController.putProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
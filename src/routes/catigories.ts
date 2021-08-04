import { Router } from "express";
import CategoryControllers from '../controllers/CategoryControllers';
import Validate from '../middleware/validation';
import requestSchema from '../validations/category';
import auth from '../middleware/auth';

const router = Router({ mergeParams: true });
const ctrl = new CategoryControllers();

router
    .route('/')
    .post(Validate(requestSchema.create), auth, ctrl.create)
    .get(auth, ctrl.list)

router.route('/:id')
    .get(Validate(requestSchema.load), auth, ctrl.load)
    .put(Validate(requestSchema.update), auth, ctrl.update)
    .delete(Validate(requestSchema.remove), auth, ctrl.remove)

export default router;
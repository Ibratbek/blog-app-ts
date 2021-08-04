import { Router } from "express";
import AuthController from '../controllers/AuthController';
import validate from '../middleware/validation';
import requestSchema from '../validations/auth';

const router = Router({ mergeParams: true });
const ctrl = new AuthController();

router.route('/login').post(validate(requestSchema.login), ctrl.login)

export default router;
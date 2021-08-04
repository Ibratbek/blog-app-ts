import { Router } from "express";
import userRoutes from './user';
import authRoutes from './auth';
import categoryRoutes from './catigories';
import postRoutes from './post';

const router = Router({ mergeParams: true });
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);

export default router;
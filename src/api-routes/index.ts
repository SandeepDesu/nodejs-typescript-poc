import { Router } from 'express';
import BookRouter from './Books';

const router = Router();

router.use('/books', BookRouter);

export default router;

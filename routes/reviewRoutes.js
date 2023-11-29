import { Router } from 'express';
import {
  addReview,
  deleteReview,
  getAllReviews,
  getReviewsByUserId,
  getSingleReview,
  editReview,
} from '../controllers/reviewController.js';

const router = Router();

router.get('/all', getAllReviews);
router.get('/oneuser/:id', getReviewsByUserId);
router.get('/singlereview/:id', getSingleReview);

router.post('/new', addReview);
router.patch('/edit/:id', editReview);
router.delete('/delete/:id', deleteReview);

export default router;

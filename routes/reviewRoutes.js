import { Router } from 'express';
import {
  addReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  getReviewsByUserId,
  getReviewsByBookId,
  editReview,
} from '../controllers/reviewController.js';

const router = Router();

router.get('/all', getAllReviews);
router.get('/singlereview/:id', getSingleReview);
router.get('/of-one-user/:id', getReviewsByUserId);
router.get('/of-one-book/:id', getReviewsByBookId);

router.post('/new', /*  authorization, */ addReview);
router.patch('/edit/:id', /* authorization, role, */ editReview);
router.delete('/delete/:id', /* authorization, role, */ deleteReview);

export default router;

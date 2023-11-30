import { Router } from 'express';
import {
  addReview,
  deleteReview,
  getAllReviews,
  getReviewsByUserId,
  getSingleReview,
  editReview,
} from '../controllers/reviewController.js';
import { authorization } from '../middleware/authorisation.js';
import { role } from '../middleware/role.js';

const router = Router();

router.get('/all', getAllReviews);
router.get('/oneuser/:id', getReviewsByUserId);
router.get('/singlereview/:id', getSingleReview);

router.post('/new', authorization, addReview);
router.patch('/edit/:id', authorization, role, editReview);
router.delete('/delete/:id', authorization, role, deleteReview);

export default router;

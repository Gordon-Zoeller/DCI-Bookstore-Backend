import ReviewModel from '../models/reviewSchema.js';
import UserModel from '../models/userSchema.js';
// import BookModel from '../models/bookSchema.js';

export const getAllReviews = async (req, res, next) => {
  try {
    const showReviews = await ReviewModel.find()
      .populate('book', 'title -_id')
      .populate('userId', 'email');

    res.send({ success: true, data: showReviews });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByUserId = async (req, res, next) => {
  try {
    const showSingleOrder = await ReviewModel.find({
      userId: req.params.id,
    })
      .populate('review', 'title')
      .populate('userId', 'email');

    res.send({ success: true, data: showSingleOrder });
  } catch (error) {
    next(error);
  }
};

export const getSingleReview = async (req, res, next) => {
  try {
    const showOneReview = await ReviewModel.findById(req.params.id)
      .populate('book', 'title')
      .populate('userId', 'email');

    res.send({ success: true, data: showOneReview });
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const createReview = await ReviewModel.create(req.body);
    const updateUser = await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $push: {
          reviews: createReview._id,
          // double ID in the user-reviews???
          // reviews: { reviewId: createReview._id, book: createReview.title },
        },
      },
      { new: true }
    );

    res.send({ success: true, data: updateUser });
  } catch (error) {
    next(error);
  }
};

export const editReview = async (req, res, next) => {
  try {
    const updateReview = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.send({ success: true, data: updateReview });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await ReviewModel.findByIdAndDelete(req.params.id);

    res.send({
      success: true,
      data: `review deleted`,
    });
  } catch (error) {
    next(error);
  }
};

import BookModel from '../models/bookSchema.js';
import ReviewModel from '../models/reviewSchema.js';
import UserModel from '../models/userSchema.js';

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

export const getReviewsByUserId = async (req, res, next) => {
  try {
    const showSingleReview = await ReviewModel.find({
      userId: req.params.id,
    })
      .populate('review', 'title')
      .populate('userId', 'email');

    res.send({ success: true, data: showSingleReview });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByBookId = async (req, res, next) => {
  try {
    const showReviews = await ReviewModel.find({ book: req.params.id })
      .populate('userId', 'firstName')
      .populate('book', 'title');

    res.send({ success: true, data: showReviews });
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
        $push: { reviews: createReview._id },
      },
      { new: true }
    );

    const updateBook = await BookModel.findByIdAndUpdate(
      req.body.book,
      {
        $push: { reviews: createReview._id },
      },
      { new: true }
    );

    res.send({ success: true, data: createReview });
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
    // no need to update references to the BOOK/USER reviews-arrays here (--> only the review-ID referenced there)

    res.send({ success: true, data: updateReview });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await ReviewModel.findByIdAndDelete(req.params.id);

    await UserModel.findByIdAndDelete(req.params.userId, {
      $pull: { reviews: req.params.id },
    });

    await BookModel.findByIdAndDelete(req.params.book, {
      $pull: { reviews: req.params.id },
      // mongoDB ---> ARRAY UPDATE OPERATORS ($pop / $slice / etc..)
    });

    res.send({
      success: true,
      message: `review deleted`,
    });
  } catch (error) {
    next(error);
  }
};

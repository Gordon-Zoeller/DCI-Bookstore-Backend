import { model, Schema } from 'mongoose';

const ReviewSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  title: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const ReviewModel = model('Review', ReviewSchema);

export default ReviewModel;

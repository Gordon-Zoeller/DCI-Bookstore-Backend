import { model, Schema } from 'mongoose';

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  year: { type: Number, required: true },
  publisher: { type: String, required: true },
  genre: String,
  price: { type: Number, required: true },
  ISBN: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  thumbnail: String,
});

const BookModel = model('Book', BookSchema);

export default BookModel;

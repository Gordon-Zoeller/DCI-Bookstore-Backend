import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  dateOfBirth: Date,
  address: {
    street: String,
    zipCode: String,
    city: String,
    country: String,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  /* 
   // double id (title of the book included)
   reviews: [
    {
      reviewId: { type: Schema.Types.ObjectId, ref: 'Review' },
      book: String,
    },
  ], */
});

const UserModel = model('User', UserSchema);

export default UserModel;

import { Schema, model } from 'mongoose';

const ImageSchema = new Schema({
  filename: { type: String, required: true },
  data: { type: Buffer },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
});

const ImageModel = model('Image', ImageSchema);

export default ImageModel;

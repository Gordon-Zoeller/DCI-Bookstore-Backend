import stream from 'stream';
import ImageModel from '../models/imageSchema.js';

export const streamImage = async (req, res, next) => {
  try {
    const image = await ImageModel.findOne({ filename: req.params.filename });

    if (image) {
      const ReadStream = stream.Readable.from(image.data);
      ReadStream.pipe(res);
    }
  } catch (error) {
    next(error);
  }
};

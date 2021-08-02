import { Schema } from 'mongoose';

import Review from './Review';
import Publisher from './Publisher';

export default new Schema({
  name: String,
  author: [String],
  price: String,
  reviews: [Review],
  publisher: Publisher,
});

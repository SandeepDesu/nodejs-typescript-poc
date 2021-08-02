import { Schema } from 'mongoose';

export default new Schema({
  review_id: String,
  reviwer: String,
  message: String,
});

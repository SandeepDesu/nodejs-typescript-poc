import { Schema, model } from 'mongoose';
import { IReview } from '../interfaces';

const ReviewSchema = new Schema<IReview>({
  review_id: { type: String, required: true },
  reviwer: { type: String, required: true },
  message: { type: String, required: true },
});

export const ReviewModel = model<IReview>('Review', ReviewSchema);

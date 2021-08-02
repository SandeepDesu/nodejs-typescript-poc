import { Schema, model } from 'mongoose';
import { IPublisher } from '../interfaces';

const PublisherSchema = new Schema<IPublisher>({
  publisher_id: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
});

export const PublisherModel = model<IPublisher>('Publisher', PublisherSchema);

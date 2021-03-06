import { Schema, model } from 'mongoose';
import { IPublisher } from '../interfaces';

const PublisherSchema = new Schema<IPublisher>({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

export const PublisherSchemaModel = model<IPublisher>('Publisher', PublisherSchema);

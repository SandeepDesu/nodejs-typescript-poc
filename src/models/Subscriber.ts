import { IPublisher } from '../interfaces';
import { PublisherModel } from '../schemas';

class Publisher {
  async getReviews(): Promise<IPublisher[]> {
    return await PublisherModel.find({});
  }

  async getReview(id: string): Promise<IPublisher> {
    return await PublisherModel.findOne({ _id: id });
  }

  async createReview(book: IPublisher): Promise<IPublisher> {
    return await PublisherModel.create(book);
  }
}

export default new Publisher();

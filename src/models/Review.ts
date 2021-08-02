import { IReview } from '../interfaces';
import { ReviewModel } from '../schemas';

class Review {
  async getReviews(): Promise<IReview[]> {
    return await ReviewModel.find({});
  }

  async getReview(id: string): Promise<IReview> {
    return await ReviewModel.findOne({ _id: id });
  }

  async createReview(book: IReview): Promise<IReview> {
    return await ReviewModel.create(book);
  }
}

export default new Review();

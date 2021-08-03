import { IReview } from '../interfaces';
import { ReviewSchemaModel } from '../schemas';

class ReviewModel {
  async getReviews(): Promise<IReview[]> {
    return await ReviewSchemaModel.find({});
  }

  async getReview(id: string): Promise<IReview> {
    return await ReviewSchemaModel.findOne({ _id: id });
  }

  async createReview(review: IReview): Promise<IReview> {
    return await ReviewSchemaModel.create(review);
  }

  async createReviews(reviews: IReview[]): Promise<IReview[]> {
    return await ReviewSchemaModel.insertMany(reviews);
  }

  // async updateReview(review: IReview): Promise<IReview> {
  //   return await ReviewSchemaModel.updateOne(review);
  // }

  // async updateReviews(reviews: IReview[]): Promise<IReview[]> {
  //   return await ReviewSchemaModel.updateMany(reviews);
  // }
}

export default new ReviewModel();

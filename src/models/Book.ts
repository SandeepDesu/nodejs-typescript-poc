import { IBook } from '../interfaces';
import { BookModel } from '../schemas';

class Book {
  async getBooks(): Promise<IBook[]> {
    return await BookModel.find({});
  }

  async getBook(id: string): Promise<IBook> {
    return await BookModel.findOne({ _id: id });
  }

  async createBook(book: IBook): Promise<IBook> {
    return await BookModel.create(book);
  }
}

export default new Book();

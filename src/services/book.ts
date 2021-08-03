import { Request, Response } from 'express';

import BookModel from '../models/Book';
import ReviewModel from '../models/Review';
import PublisherModel from '../models/Publisher';

class BookService {
  async getBooks(req: Request, res: Response): Promise<void> {
    const results = await BookModel.getBooks()
    res.send(results);
  }

  async getBook(req: Request, res: Response): Promise<void> {
    const results = await BookModel.getBook(req.params.book_id);
    res.send(results);
  }

  async createBook(req: Request, res: Response): Promise<void> {
    const book = { ...req.body };
    const review = await ReviewModel.createReviews(book.reviews);
    const publisher = await PublisherModel.createPublisher(book.publisher);
    const reviews_id = review.map((doc) => doc._id);
    book.reviews = [...reviews_id];
    book.publisher = publisher._id;
    const results = await BookModel.createBook(book);
    res.send(results);
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    const book = { ...req.body };
    const id = req.params.book_id;
    if (book.publisher) {
      await PublisherModel.updatePublisher(book.publisher);
    }
    delete book.reviews;
    delete book.publisher;
    const updatedBook = await BookModel.updateBook(id, book);
    res.send(updatedBook);
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    const id = req.params.book_id;
    const updatedBook = await BookModel.deleteBook(id);
    res.send(updatedBook);
  }
}

export default new BookService();

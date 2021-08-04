import { Request, Response } from 'express';

import BookModel from '../models/Book';
import ReviewModel from '../models/Review';
import PublisherModel from '../models/Publisher';

import { IBook } from '../interfaces';

class BookService {
  async getBooks(req: Request, res: Response): Promise<void> {
    const books = await BookModel.getBooks();
    const results = await Promise.all(
      books.map(async (book: IBook) => {
        const b = {
          book_id: book._id,
          name: book.name,
          author: book.author,
          price: book.price,
          reviews: [],
          publisher: {},
        };

        const reviews = await ReviewModel.getReviews(
          { _id: { $in: book.reviews } },
          { review_id: '$_id', _id: 0, reviwer: 1, message: 1 },
        );

        const publisher = await PublisherModel.getPublisher(book.publisher, {
          publisher_id: '$_id',
          _id: 0,
          name: 1,
          location: 1,
        });

        b.reviews = reviews;
        b.publisher = publisher;
        return b;
      }),
    );
    res.send(results);
  }

  async getBook(req: Request, res: Response): Promise<void> {
    const book = await BookModel.getBook(req.params.book_id);
    const b = {
      book_id: book._id,
      name: book.name,
      author: book.author,
      price: book.price,
      reviews: [],
      publisher: {},
    };
    const reviews = await ReviewModel.getReviews(
      { _id: { $in: book.reviews } },
      { review_id: '$_id', _id: 0, reviwer: 1, message: 1 },
    );

    const publisher = await PublisherModel.getPublisher(book.publisher, {
      publisher_id: '$_id',
      _id: 0,
      name: 1,
      location: 1,
    });
    b.reviews = reviews;
    b.publisher = publisher;
    res.send(b);
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

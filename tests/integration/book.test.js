const { expect } = require("chai");
const { Book } = require("../../src/models");
const app = require("../../src/app");
const dataFactory = require("../helpers/dataFactory");
const {
  postBook,
  getBooks,
  getBookById,
  updateBook,
  deleteById,
} = require("../helpers/bookHelper");

describe("/books", () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no books in the database", () => {
    describe("POST", () => {
      it.only("creates a book", async () => {
        const bookData = dataFactory.bookData();

        const { res, body } = await postBook(res, bookData);

        expect(res.status).to.equal(201);
        expect(body.title).to.equal(bookData.title);
        expect(body.author).to.equal(bookData.author);
        expect(body.genre).to.equal(bookData.genre);
        expect(body.isbn).to.equal(bookData.isbn);

        const bookDocument = await Book.findByPk(body.id, { raw: true });

        expect(bookDocument.title).to.equal(bookData.title);
        expect(bookDocument.author).to.equal(bookData.author);
        expect(bookDocument.genre).to.equal(bookData.genre);
        expect(bookDocument.isbn).to.equal(bookData.isbn);
      });

      it.only("returns an error if title is empty", async () => {
        const bookData = dataFactory.bookData();

        const testData = {
          title: "",
          author: bookData.author,
          genre: bookData.genre,
          isbn: bookData.isbn,
        };

        const { status, body } = await postBook(app, testData);
        expect(status).to.equal(400);
        expect(body).to.equal(`"title" is not allowed to be empty`);
      });

      it.only("returns an error if author is empty", async () => {
        const bookData = dataFactory.bookData();

        const testData = {
          title: bookData.title,
          author: "",
          genre: bookData.genre,
          isbn: bookData.isbn,
        };

        const { status, body } = await postBook(app, testData);
        expect(status).to.equal(400);
        expect(body).to.equal(`"author" is not allowed to be empty`);
      });
    });
  });

  describe("with records in the database", () => {
    let books;

    beforeEach(async () => {
      const bookExamples = [];

      for (let i = 0; i < 3; i++) {
        bookExamples.push(dataFactory.bookData());
      }

      books = await Promise.all(
        bookExamples.map(async (book) => Book.create(book))
      );
    });

    describe("GET /books", () => {
      it("gets all books records", async () => {
        const response = await getBooks(app);

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.isbn).to.equal(expected.isbn);
        });
      });
    });

    describe("GET /books/:id", () => {
      it("gets book records by id", async () => {
        const book = books[0];

        const response = await getBookById(app, book);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.isbn).to.equal(book.isbn);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await getBookById(app, { id: 12345 });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("PATCH /books/:id", () => {
      it("updates books by id", async () => {
        const currentBookInfo = books[0];
        const readerRecord = await Book.findByPk(currentBookInfo.id, {
          raw: true,
        });
        const newBookInfo = dataFactory.bookData();

        const response = await updateBook(app, currentBookInfo, newBookInfo);

        const updatedReaderRecord = await Book.findByPk(currentBookInfo.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.title).not.to.equal(readerRecord.title);
        expect(updatedReaderRecord.author).not.to.equal(readerRecord.author);
        expect(updatedReaderRecord.genre).not.to.equal(readerRecord.author);
        expect(updatedReaderRecord.isbn).not.to.equal(readerRecord.isbn);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await updateBook(app, { id: 12345 }, 0);

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          `Book ID (12345) could not be found.`
        );
      });

      it("returns an error if title is empty", async () => {
        const currentBookInfo = books[0];

        const newBookInfo = dataFactory.bookData();

        const testData = {
          title: "",
          author: newBookInfo.author,
          genre: newBookInfo.genre,
          isbn: newBookInfo.isbn,
        };

        const response = await updateBook(app, currentBookInfo, testData);

        expect(response.status).to.equal(400);
        expect(response.body).to.equal(`"title" is not allowed to be empty`);
      });

      it("returns an error if author is empty", async () => {
        const currentBookInfo = books[0];

        const newBookInfo = dataFactory.bookData();

        const testData = {
          title: newBookInfo.title,
          author: "",
          genre: newBookInfo.genre,
          isbn: newBookInfo.isbn,
        };

        const response = await updateBook(app, currentBookInfo, testData);

        expect(response.status).to.equal(400);
        expect(response.body).to.equal(`"author" is not allowed to be empty`);
      });
    });

    describe("DELETE /books/:id", () => {
      it("deletes book record", async () => {
        const book = books[0];
        const response = await deleteById(app, book);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await deleteById(app, { id: 12345 });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });
  });
});

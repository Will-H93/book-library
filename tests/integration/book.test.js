const { expect } = require("chai");

const { Book } = require("../../src/models");
const app = require("../../src/app");
const dataFactory = require("../helpers/dataFactory");
const {
  postBook,
  getBooks,
  getBookById,
  updateBook,
} = require("../helpers/bookHelper");

describe("/books", () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no books in the database", () => {
    describe("POST", () => {
      it("creates a book", async () => {
        const bookData = dataFactory.bookData();

        const { status, body } = await postBook(app, bookData);

        expect(status).to.equal(201);
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

      it("returns a 404 if the reader does not exist", async () => {
        const response = await getBookById(app, 12345);

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("PATCH /books/:id", () => {
      it("updates books isbn by id", async () => {
        const book = books[0];
        const newIsbn = dataFactory.bookData.isbn;
        const response = await updateBook(app, book, newIsbn);

        const updatedReaderRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.isbn).to.equal(response.body.isbn);
      });

      it("returns a 404 if the reader does not exist", async () => {
        const response = await updateBook(app, 12345, 0);

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });
  });
});

const request = require("supertest");

const postBook = (app, data) => {
  return new Promise((res, rej) => {
    request(app)
      .post("/books")
      .send(data)
      .end((err, response) => {
        if (err) {
          rej(err);
        } else {
          res(response);
        }
      });
  });
};

const getBooks = (app) => {
  return new Promise((res, rej) => {
    request(app)
      .get("/books")
      .send()
      .end((err, response) => {
        if (err) {
          rej(err);
        } else {
          res(response);
        }
      });
  });
};

const getBookById = (app, book) => {
  return new Promise((res, rej) => {
    request(app)
      .get(`/books/${book.id}`)
      .send()
      .end((err, response) => {
        if (err) {
          rej(err);
        } else {
          res(response);
        }
      });
  });
};

const updateBook = (app, currentBookInfo, newBookInfo) => {
  return new Promise((res, rej) => {
    request(app)
      .get(`/books/${currentBookInfo.id}`)
      .send({ newBookInfo })
      .end((err, response) => {
        if (err) {
          rej(err);
        } else {
          res(response);
        }
      });
  });
};

const deleteById = (app, book) => {
  return new Promise((res, rej) => {
    request(app)
      .delete(`/books/${book.id}`)
      .end((err, response) => {
        if (err) {
          rej(err);
        } else {
          res(response);
        }
      });
  });
};

module.exports = { postBook, getBooks, getBookById, updateBook, deleteById };

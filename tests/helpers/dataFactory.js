const { faker } = require("@faker-js/faker");

const bookData = (options = {}) => {
  return {
    title: options.title || faker.lorem.words(),
    author: options.author || faker.name.fullName(),
    genre: options.genre || faker.lorem.words(),
    isbn: options.isbn || faker.lorem.word(10),
  };
};

const readerData = (options = {}) => {
  return {
    name: options.name || faker.name.fullName(),
    email: options.email || faker.internet.email(),
    password: options.password || faker.internet.password(8)
  };
};

module.exports = { bookData, readerData };

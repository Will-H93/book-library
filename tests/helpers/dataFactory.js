const { faker } = require("@faker-js/faker");

const bookData = (options = {}) => {
  return {
    title: options.title || faker.lorem.words(),
    author: options.author || faker.name.fullName(),
    genre: options.genre || faker.lorem.words(),
    isbn: options.isbn || faker.lorem.word(10),
  };
};

module.exports = { bookData };

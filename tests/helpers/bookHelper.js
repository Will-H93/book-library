const request = require('supertest')

const postBook = (app, data) => {
    return new Promise((res, rej) => {
        request(app)
        .post('/books')
        .send(data)
        .end((err, response) => {
            if(err) {
                rej(err)
            } else {
                res(response)
            }
        })
    })
}

const getBooks = (app) => {
    return new Promise((res, rej) => {
        request(app)
        .get('/books')
        .send()
        .end((err, response) => {
            if(err) {
                rej(err)
            } else {
                res(response)
            }
        })
    })
}

const getBookById = (app, book) => {
    return new Promise((res, rej) => {
        request(app)
        .get(`/books/${book.id}`)
        .send()
        .end((err, response) => {
            if(err) {
                rej(err)
            } else {
                res(response)
            }
        })
    })
}

const updateBook = (app, book, newIsbn) => {
    return new Promise((res, rej) => {
        request(app)
        .get(`/books/${book.id}`)
        .send({ isbn: newIsbn })
        .end((err, response) => {
            if(err) {
                rej(err)
            } else {
                res(response)
            }
        })
    })
}

module.exports = { postBook, getBooks, getBookById, updateBook };
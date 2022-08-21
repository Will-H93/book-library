const sinon = require('sinon')

const { create } = require('../../src/controllers/bookController')

describe('create', (() => {
    let req, res

    beforeEach(() => {
        req = {
            body: {
                title: 'The Lord of the Rings',
                author: 'J.R.R Tolkien',
                genre: 'Fantasy',
                isbn: '978-0261103252'
            }
        }

        res = {
            status: () => {
                body: () => {

                }
            }
        }
    })
    afterEach(() => {
        sinon.restore()
    })

    it('spy', () => {
        const createdSpy = sinon.spy(create, 'create')

        create(req, res)

        sinon.assert.calledOnce(createdSpy)
    })
}))
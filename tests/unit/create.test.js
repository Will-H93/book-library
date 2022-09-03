const sinon = require("sinon");

const { create } = require("../../src/controllers/controller");
const { Book } = require("../../src/models");

describe("create", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: "The Lord of the Rings",
        isbn: "978-0261103252",
      },
      baseUrl: "/books",
    };

    res = {
      status: () => {
        () => {};
      },
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("is called once with the request body", () => {
    const createdSpy = sinon.spy(Book, "create");

    create(req, req.baseUrl.slice(1, -1), res);

    sinon.assert.calledOnce(createdSpy);
    sinon.assert.calledWith(createdSpy, req.body);
  });

  it("resolves", () => {
    const createdStub = sinon.stub(Book, "create").callsFake(() => create);

    create(req, req.baseUrl.slice(1, -1), res);

    sinon.assert.calledWith(createdStub, req.body);
    sinon.assert.calledWith(
      createdStub,
      sinon.match({ title: "The Lord of the Rings" })
    );
  });
});

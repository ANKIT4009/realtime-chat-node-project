const { expect } = require("chai");
const request = require("supertest");
const { app } = require("../server");

describe("Chat API", function () {
  it("GET /api/health should return OK", async function () {
    const response = await request(app).get("/api/health");

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ status: "ok" });
  });

  it("GET /api/messages should return a JSON response", async function () {
    const response = await request(app).get("/api/messages");

    expect(response.status).to.be.oneOf([200, 500]);
    expect(response.headers["content-type"]).to.match(/json/);
  });
});

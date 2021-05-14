// const babel = require("babel-polyfill");
const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");

const Users = mongoose.model("users");

describe("User route", () => {
  afterAll(async () => {
    await Users.deleteMany({});
    mongoose.connection.close();
  });

  it("must create a user if valid data", async () => {
    console.log("cheguei aqui");
    const response = await request(app)
      .post("/user/")
      .send({
        name: "test",
        email: "test@email.com",
        password: "123456",
      })
      
    expect(response.status).toBe(201);
  });
});

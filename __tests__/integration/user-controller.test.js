const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");

const Users = mongoose.model("users");

describe("User route", () => {
  afterAll(async () => {
    await Users.deleteMany({});
    mongoose.connection.close();
  });

  let userId;

  it("must create a user if valid data and integration between components", async () => {
    const response = await request(app).post("/user/").send({
      name: "test",
      email: "test@email.com",
      password: "123456",
    });
    userId = response.body.item._id;
    expect(response.status).toBe(201);
  });

  it("must return a user from his ID if integration between the components", async () => {
    const response = await request(app).get(`/user/${userId}`);

    expect(response.status).toBe(200);
  });

  it("must list all users if integration between components", async () => {
    const response = await request(app).get(`/user/`);

    expect(response.status).toBe(200);
  });

  it("must update a user if integration between components", async () => {
    const response = await request(app).put(`/user/${userId}`).send({
      name: "test test",
      email: "test_1@email.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
  });

  it("must delete a user given his ID if integration between components", async () => {
    const response = await request(app).delete(`/user/${userId}`);

    expect(response.status).toBe(200);
  });
});

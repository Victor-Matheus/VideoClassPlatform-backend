const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const validate = require("../../src/services/inputValidations");
const EResponseValidate = require("../../src/enums/EResponseValidate");

const Users = mongoose.model("users");

describe("User route", () => {
  afterAll(async () => {
    await Users.deleteMany({});
    mongoose.connection.close();
  });

  let userId;
  let userEmail;

  it("must create a user if valid data and integration between components", async () => {
    const response = await request(app).post("/user/").send({
      name: "test",
      email: "test@email.com",
      password: "123456",
    });
    userId = response.body.item._id;
    userEmail = response.body.item.email;
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

  it("must return EResponseValidate.valid if email is not registered", async () => {
    const email = "testeteste@email.com";
    const response = await validate.emailAlreadyRegistered(email);
    expect(response).toBe(EResponseValidate.valid);
  });

  it("must return EResponseValidate.invalid if email is already registered", async () => {
    const email = userEmail
    const response = await validate.emailAlreadyRegistered(email);
    expect(response).toBe(EResponseValidate.invalid);
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

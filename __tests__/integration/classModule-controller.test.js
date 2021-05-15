const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const authService = require("../../src/auth");

const ClassModule = mongoose.model("classModules");

describe("Class Modules Route", () => {
  afterAll(async () => {
    await ClassModule.deleteMany({});
    mongoose.connection.close();
  });

  let moduleId;
  let token;

  const setToken = async () => {
    token = await authService.generateToken({
      name: "test",
    });
  };
  setToken();

  it("should create a class module in case of integration between components", async () => {
    const response = await request(app)
      .post("/module/")
      .set({ "x-access-token": `${token}` })
      .send({
        title: "title test",
        description: "this is the class module test",
      });

    moduleId = response.body.item._id;

    expect(response.status).toBe(201);
  });

  it("must update a class module in case of integration between components", async () => {
    const response = await request(app)
      .put(`/module/${moduleId}`)
      .set({ "x-access-token": `${token}` })
      .send({
        title: "js intermediary module",
        description: "this is the class module test",
      });

    expect(response.status).toBe(200);
  });

  it("must return a class module given its id if integration between components", async () => {
    const response = await request(app)
      .get(`/module/${moduleId}`)
      .set({ "x-access-token": `${token}` });

    expect(response.status).toBe(200);
  });

  it("must return a list of class module if integration between components", async () => {
    const response = await request(app)
      .get(`/module/`)
      .set({ "x-access-token": `${token}` });

    expect(response.status).toBe(200);
  });

  it("must delete a class module given its ID if integration between components", async () => {
    const response = await request(app)
      .delete(`/module/${moduleId}`)
      .set({ "x-access-token": `${token}` });

    expect(response.status).toBe(200);
  });
});

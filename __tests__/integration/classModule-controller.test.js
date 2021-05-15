const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");

const ClassModule = mongoose.model("classModules");
const Leasson = mongoose.model("videoLeassons")

describe("Class Modules Route", () => {
  afterAll(async () => {
    await ClassModule.deleteMany({});
    mongoose.connection.close();
  });

  let moduleId;

  it("should create a class module in case of integration between components", async () => {

    const response = await request(app).post("/module/").send({
        title: "title test",
        description: "this is the class module test"
    });

    moduleId = response.body.item._id;

    expect(response.status).toBe(201);
  });

  it("must update a class module in case of integration between components", async () => {

    const response = await request(app).put(`/module/${moduleId}`).send({
        title: "js intermediary module",
        description: "this is the class module test",
    });

    expect(response.status).toBe(200);
  });

  it("must return a class module given its id if integration between components", async () => {

    const response = await request(app).get(`/module/${moduleId}`);

    expect(response.status).toBe(200);
  });

  it("must return a list of class module if integration between components", async () => {

    const response = await request(app).get(`/module/`);

    expect(response.status).toBe(200);
  });

  it("must delete a class module given its ID if integration between components", async () => {

    const response = await request(app).delete(`/module/${moduleId}`);

    expect(response.status).toBe(200);
  });

});

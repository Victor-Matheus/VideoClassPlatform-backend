const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const authService = require("../../src/auth");

const ClassModule = mongoose.model("classModules");
const VideoLeasson = mongoose.model("videoLeassons");

describe("Video Leassons Route", () => {
  afterAll(async () => {
    await ClassModule.deleteMany({});
    await VideoLeasson.deleteMany({});
    mongoose.connection.close();
  });

  let classModuleId;
  let leassonId;
  let token;

  const setToken = async () => {
    token = await authService.generateToken({
      name: "test",
    });
  };

  setToken();

  it("must create a leasson given a class module if integration between components", async () => {
    const _classModule = await request(app)
      .post("/module/")
      .set({ "x-access-token": `${token}` })
      .send({
        title: "Class Module test",
      });

    classModuleId = _classModule.body.item._id;

    const response = await request(app)
      .post("/leasson/")
      .set({ "x-access-token": `${token}` })
      .send({
        moduleId: classModuleId,
        title: "Leasson test",
        link: "https://linktest.com",
      });

    leassonId = response.body.item._id;

    expect(response.status).toBe(201);
  });

  it("must update a leasson given its id if integration between components", async () => {
    const response = await request(app)
      .put(`/leasson/${leassonId}`)
      .set({ "x-access-token": `${token}` })
      .send({
        title: "test title",
        link: "https://newlinktest.com",
      });

    expect(response.status).toBe(200);
  });

  it("must return a leasson given its id if integration between components", async () => {
    const response = await request(app)
      .get(`/leasson/${leassonId}`)
      .set({ "x-access-token": `${token}` });

    expect(response.status).toBe(200);
  });

  it("given a module, it should return all videos leassons if integration between components", async () => {
    const response = await request(app)
      .get(`/leasson/module/${classModuleId}`)
      .set({ "x-access-token": `${token}` });

    expect(response.status).toBe(200);
  });

  it("must remove a video leasson given its ID if integration between components", async () => {
    const response = await request(app)
      .delete(`/leasson/${leassonId}`)
      .set({ "x-access-token": `${token}` });

    expect(response.status).toBe(200);
  });
});

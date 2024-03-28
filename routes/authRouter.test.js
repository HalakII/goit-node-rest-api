import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";
import { findUser, deleteUsers } from "../services/authSevices.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test/login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await deleteUsers({});
  });

  test("test/ login with correct data", async () => {
    const loginData = {
      email: "10imiia@gmail.com",
      password: "123456",
      subscription: "starter",
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
    expect(body.email).toBe(loginData.email);
    expect(body.email).toBe(loginData.email);

    const user = await findUser({ email: loginData.email });
    expect(user.email).toBe(loginData.email);
  });
});

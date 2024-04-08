import request, { Response } from "supertest";
import app from "../src/app";

describe("PUT api/task:taskId", () => {
  test("get a task by their id", async () => {
    const id = 1;
    const d = await request(app)
      .put(`/task/:${id}`)
      .send({ assignedTo: "kumar" });
    expect(d.statusCode).toBe(200);
  });
});

import request, { Response } from "supertest";
import app from "../src/app";

describe("DELETE api/task:taskId", () => {
  test("delete a task", async () => {
    const id = 1;
    const d = await request(app).delete(`/task/:${id}`);
    expect(d.statusCode).toBe(200);
  });
});

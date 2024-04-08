import request, { Response } from "supertest";
import app from "../src/app";

describe("GET /api/task", () => {
  test("get all task", async () => {
    const da: Response = await request(app).get("/task");
    expect(da.statusCode).toBe(200);
  });
  test("get all task with pagination", async () => {
    const da: Response = await request(app).get("/task/?page=1&limit=30");
    expect(da.statusCode).toBe(200);
  });
  test("get all task by assignedTo", async () => {
    const da: Response = await request(app).get("/task/?assignto=kumar");
    expect(da.statusCode).toBe(200);
  });
  test("get all task by category", async () => {
    const da: Response = await request(app).get("/task/?category=kumar");
    expect(da.statusCode).toBe(200);
  });
});

import request, { Response } from "supertest";
import type { Task } from "../src/database/Task";
import app from "../src/app";

describe("POST /api/task", () => {
  test("should create a new task", async () => {
    const data: Task = {
      id: "abcd",
      title: "test",
      description: "test description",
      userId: 1,
      dueDate: new Date(),
      status: "pending",
      isActive: true,
      createdAt: new Date(),
      createdBy: "kumar",
      category: "todo",
      assignedTo: "shyam",
    };
    const da: Response = await request(app).post("/task").send(data);
    expect(da.statusCode).toBe(201);
    expect(da.body.data).toHaveProperty("id");
  });
});

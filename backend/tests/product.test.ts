import request from "supertest";
import app from "../src/server"; // se você exportar o app separado do listen

describe("GET /api/products", () => {
  it("deve retornar status 401 se não enviar token", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

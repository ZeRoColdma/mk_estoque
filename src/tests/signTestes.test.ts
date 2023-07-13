import bcrypt from "bcrypt";
import { AuthUser } from "../Controllers/UserSessionController/SessionController";
const authUser = new AuthUser();

describe("signIn", () => {
  it("should return 400 if email or password is missing", async () => {
    const request = { body: {} };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: "Missing email or password",
    });
  });

  it("should return 400 if user is not found", async () => {
    const request = { body: { email: "test@example.com" } };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should return 400 if password does not match", async () => {
    const request = {
      body: { email: "test@example.com", password: "wrongpassword" },
    };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: "Incorrect password" });
  });
});

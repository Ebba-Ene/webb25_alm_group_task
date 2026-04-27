require("../test-setup");
const { describe, it, expect } = require("vitest");
const User = require("../../src/models/User");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  // TODO: Test that email must be unique
  // TODO: Test that username must be unique
  // TODO: Test that email format is validated
  // TODO: Test that profileImage is a valid URL
});

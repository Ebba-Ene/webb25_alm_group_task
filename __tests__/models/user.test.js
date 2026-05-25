import "../test-setup"
import { describe, it, expect } from "vitest"
import User from "../../src/models/User"
import Accommodation from "../../src/models/Accommodation"

describe("User & Accommodation relationship", () => {
  it("should delete accommodations when the user is deleted", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    })

    const accommodation = await Accommodation.create({
      address: "Sveavägen 13",
      city: "Stockholm",
      country: "Sverige",
      zipCode: "000008",
      rent: 3000,
      room: 2,
      user: user._id,
    })

    const foundAccommodation = await Accommodation.findById(accommodation._id)

    expect(foundAccommodation).toBeDefined()
    expect(foundAccommodation.user.toString()).toBe(user._id.toString())

    await User.findOneAndDelete({ _id: user._id })
    const deletedAccommodation = await Accommodation.findById(accommodation._id)
    expect(deletedAccommodation).toBeNull()
  })
})

describe("User Model", () => {
  it("Should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    })
    expect(user).toBeDefined()
    expect(user.username).toBe("testuser")
    expect(user.email).toBe("test@test.com")
  })

  it("Should require unique email", async () => {
    await User.create({ username: "sameuser1", email: "test1@test.com" })
    await expect(
      User.create({ username: "sameuser2", email: "test1@test.com" }),
    ).rejects.toThrow()
  })

  it("Should require unique username", async () => {
    await User.create({ username: "sameuser", email: "test1@test.com" })
    await expect(
      User.create({ username: "sameuser", email: "test2@test.com" }),
    ).rejects.toThrow()
  })

  it("Should reject invalid profileImage URL", async () => {
    await expect(
      User.create({
        username: "sameuser",
        email: "correct@gmail.com",
        profileImage: "avatar.png",
      }),
    ).rejects.toThrow()
  })

  it("Should require email to match valid format", async () => {
    await expect(
      User.create({
        username: "sameuser",
        email: "not.my.correct.nail.www.com",
      }),
    ).rejects.toThrow()
  })
})

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
      adress: "Sveavägen 13",
      stad: "Stockholm",
      land: "Sverige",
      postnummer: "000008",
      hyra: 3000,
      rum: 2,
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

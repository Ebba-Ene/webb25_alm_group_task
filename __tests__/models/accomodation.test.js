const {MongoMemoryServer} = require("mongodb-memory-server")
const mongoose = require("mongoose")
import { beforeAll, afterAll, afterEach, describe, it, expect } from "vitest"

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
})

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

// ==========================================
// Test Database Setup
// ==========================================

const accommodationSchema = new mongoose.Schema(
  {
    address: {type: String, required: [true, 'Address is required'], trim: true},
    city: {type: String, required: [true, 'City is required'], trim: true},
    country: {type: String, required: [true, 'Country is required'], trim: true},
    zipCode: {type: String, required: [true, 'Zip code is required'], trim: true},
    rent: {type: Number, min: 0, required: [true, 'Rent is required'], trim: true},
    room: {type: Number, min: 1, required: [true, 'Rum is required'], trim: true}, 
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
  }
)

const Accommodation = mongoose.model("Accomadation", accommodationSchema)

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    profileImage: {type: String}
  }
);

const User = mongoose.model("User", userSchema)

// ==========================================
// Validation Tests
// ==========================================

describe("Model Validations", () => {
  
  it("should create an accomodation when all required fields are provided", async () => {
    const user = User.create({
      username: "testuser",
      email: "test@test.com",
    })
    const accommodation = await Accommodation.create({
        address: "ModelSkapandeTest 45",
        city: "Stockholm",
        country: "Sverige",
        zipCode: "11359",
        rent: 200000,
        room: 2,
        user: user._id
      })

    expect(accommodation).toBeDefined()
    expect(accommodation.address).toBe("ModelSkapandeTest 45")
    expect(accommodation._id).toBeDefined()
    expect(accommodation.user).toBe(user._id)
  })

  it("should not allowed null fields and should send error message", async () => {
    let error;

    try {
      await Accommodation.create({
       address: "",
        city: "",
        country: "",
        zipCode: "",
      })
    } catch (err) {
      error = err
    }

    expect(error).toBeDefined();

    expect(error.errors.address.message).toBe("Address is required")
    expect(error.errors.city.message).toBe("City is required")
    expect(error.errors.country.message).toBe("Country is required")
    expect(error.errors.zipCode.message).toBe("Zip code is required");
  })

  it("should not allow negative hyra", async () => {
    await expect(
      Accommodation.create({
        address: "HyraTest 45",
        city: "Stockholm",
        country: "Sverige",
        zipCode: "11359",
        rent: -10,
        room: 2,
      })
    ).rejects.toThrow()
  })

  it("should not allow less than one room", async () => {
    await expect(
      Accommodation.create({
        address: "Rum Test 45",
        city: "Stockholm",
        country: "Sverige",
        zipCode: "11359",
        rent: 2000,
        room: 0,
      })
    ).rejects.toThrow()
  })
})
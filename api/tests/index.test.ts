import "dotenv/config";
import mongoose from "mongoose";
import * as databaseHelper from "../src/common/databaseHelper";
import * as testHelper from "./testHelper";
import * as env from "../src/config/env.config";
import Booking, { BOOKING_EXPIRE_AT_INDEX_NAME } from "../src/models/Booking";
import Token, { TOKEN_EXPIRE_AT_INDEX_NAME } from "../src/models/Token";

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
  testHelper.initializeLogger();

  const res = await databaseHelper.connect(env.DB_URI, false, false);
  expect(res).toBeTruthy();
});

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
  if (mongoose.connection.readyState) {
    await databaseHelper.close();
  }
});

const createTokenIndex = async (expireAfterSeconds: number): Promise<void> => {
  await Token.collection.createIndex(
    { expireAt: 1 },
    { name: TOKEN_EXPIRE_AT_INDEX_NAME, expireAfterSeconds, background: true },
  );
};

const createBookingIndex = async (
  expireAfterSeconds: number,
): Promise<void> => {
  await Booking.collection.createIndex(
    { expireAt: 1 },
    {
      name: BOOKING_EXPIRE_AT_INDEX_NAME,
      expireAfterSeconds,
      background: true,
    },
  );
};

const delay = async () => {
  await testHelper.delay(5 * 1000);
};

describe("Test database initialization", () => {
  it("should test database initialization", async () => {
    //
    // Test in case of no configuration change
    //
    let res = await databaseHelper.initialize();
    expect(res).toBeTruthy();
    await delay();

    //
    // Test in case of configuration change
    //
    const tokenIndexes = await Token.collection.indexes();
    const tokenIndex = tokenIndexes.find(
      (index) => index.name === TOKEN_EXPIRE_AT_INDEX_NAME,
    );
    expect(tokenIndex).toBeDefined();

    if (tokenIndex) {
      const { expireAfterSeconds } = tokenIndex;
      await Token.collection.dropIndex(tokenIndex.name!);
      await createTokenIndex(expireAfterSeconds! + 1);
      await delay();
      res = await databaseHelper.initialize();
      expect(res).toBeTruthy();
      await delay();
    }

    const bookingIndexes = await Booking.collection.indexes();
    const bookingIndex = bookingIndexes.find(
      (index) => index.name === BOOKING_EXPIRE_AT_INDEX_NAME,
    );
    expect(bookingIndex).toBeDefined();

    if (bookingIndex) {
      const { expireAfterSeconds } = bookingIndex;
      await Booking.collection.dropIndex(bookingIndex.name!);
      await createBookingIndex(expireAfterSeconds! + 1);
      await delay();
      res = await databaseHelper.initialize();
      expect(res).toBeTruthy();
    }

    //
    // Test failure
    //
    try {
      await databaseHelper.close();
      res = await databaseHelper.initialize();
      expect(res).toBeFalsy();
    } catch (err) {
      console.error(err);
    } finally {
      res = await databaseHelper.connect(env.DB_URI, false, false);
      expect(res).toBeTruthy();
    }
  });
});

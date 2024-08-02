import { Schema, model } from "mongoose";
import * as env from "../config/env.config";

const countryValueSchema = new Schema<env.CountryValue>(
  {
    language: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
      trim: true,
      lowercase: true,
      minLength: 2,
      maxLength: 2,
    },
    value: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
      trim: true,
    },
  },
  {
    strict: true,
    collection: "CountryValue",
  },
);

const CountryValue = model<env.CountryValue>(
  "CountryValue",
  countryValueSchema,
);

export default CountryValue;

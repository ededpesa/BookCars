import { Schema, model } from "mongoose";
import * as env from "../config/env.config";

const countrySchema = new Schema<env.Country>(
  {
    code: {
      type: String,
      required: [true, "can't be blank"],
    },
    values: {
      type: [Schema.Types.ObjectId],
      ref: "CountryValue",
      validate: (value: any): boolean =>
        Array.isArray(value) && value.length >= 1,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "Country",
  },
);

const Country = model<env.Country>("Country", countrySchema);

export default Country;

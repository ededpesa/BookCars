import { Schema, model } from "mongoose";
import * as env from "../config/env.config";

const walletSchema = new Schema<env.Wallet>(
  {
    network: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
    address: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "Wallet",
  }
);

const Wallet = model<env.Wallet>("Wallet", walletSchema);

export default Wallet;

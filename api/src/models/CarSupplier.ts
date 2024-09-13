import { Schema, model } from "mongoose";
import * as bookcarsTypes from ":bookcars-types";
import * as env from "../config/env.config";

const carSupplierSchema = new Schema<env.CarSupplier>(
  {
    car: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: "Car",
      index: true,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: "User",
      index: true,
    },
    locations: {
      type: [Schema.Types.ObjectId],
      ref: "Location",
      validate: (value: any): boolean => Array.isArray(value) && value.length > 0,
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
    },
    deposit: {
      type: Number,
      required: [true, "can't be blank"],
    },
    available: {
      type: Boolean,
      required: [true, "can't be blank"],
      index: true,
    },
    fuelPolicy: {
      type: String,
      enum: [bookcarsTypes.FuelPolicy.LikeForlike, bookcarsTypes.FuelPolicy.FreeTank],
      required: [true, "can't be blank"],
    },
    mileage: {
      type: Number,
      required: [true, "can't be blank"],
    },
    cancellation: {
      type: Number,
      required: [true, "can't be blank"],
    },
    // amendments: {
    //   type: Number,
    //   required: [true, "can't be blank"],
    // },
    gps: {
      type: Number,
      required: [true, "can't be blank"],
    },
    theftProtection: {
      type: Number,
      required: [true, "can't be blank"],
    },
    collisionDamageWaiver: {
      type: Number,
      required: [true, "can't be blank"],
    },
    fullInsurance: {
      type: Number,
      required: [true, "can't be blank"],
    },
    additionalDriver: {
      type: Number,
      required: [true, "can't be blank"],
    },
    homeDelivery: {
      type: Number,
      required: [true, "can't be blank"],
    },
    babyChair: {
      type: Number,
      required: [true, "can't be blank"],
    },
    inventory: {
      type: Number,
      // required: [true, "can't be blank"],
    },
    status: {
      type: String,
      enum: [bookcarsTypes.CarStatus.Active, bookcarsTypes.CarStatus.Deleted],
      default: bookcarsTypes.CarStatus.Active,
    },
    payLaterFee: Number,
  },
  {
    timestamps: true,
    strict: true,
    collection: "CarSupplier",
  }
);

const CarSupplier = model<env.CarSupplier>("CarSupplier", carSupplierSchema);

export default CarSupplier;

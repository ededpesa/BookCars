import { Schema, model } from "mongoose";
import validator from "validator";
import * as bookcarsTypes from ":bookcars-types";
import * as env from "../config/env.config";

export const BOOKING_EXPIRE_AT_INDEX_NAME = "expireAt";

const bookingSchema = new Schema<env.Booking>(
  {
    supplier: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: "User",
      index: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: "Car",
    },
    driver: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: "User",
      index: true,
    },
    pickupLocation: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: "Location",
    },
    dropOffLocation: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: "Location",
    },
    from: {
      type: Date,
      required: [true, "can't be blank"],
    },
    to: {
      type: Date,
      required: [true, "can't be blank"],
    },
    status: {
      type: String,
      enum: [
        bookcarsTypes.BookingStatus.Void,
        bookcarsTypes.BookingStatus.Pending,
        bookcarsTypes.BookingStatus.Deposit,
        bookcarsTypes.BookingStatus.Paid,
        bookcarsTypes.BookingStatus.Reserved,
        bookcarsTypes.BookingStatus.Cancelled,
      ],
      required: [true, "can't be blank"],
    },
    cancellation: {
      type: Boolean,
      default: false,
    },
    // amendments: {
    //   type: Boolean,
    //   default: false,
    // },
    gps: {
      type: Boolean,
      default: false,
    },
    homeDelivery: {
      type: Boolean,
      default: false,
    },
    babyChair: {
      type: Boolean,
      default: false,
    },
    theftProtection: {
      type: Boolean,
      default: false,
    },
    collisionDamageWaiver: {
      type: Boolean,
      default: false,
    },
    fullInsurance: {
      type: Boolean,
      default: false,
    },
    additionalDriver: {
      type: Boolean,
      default: false,
    },
    _additionalDriver: {
      type: Schema.Types.ObjectId,
      ref: "AdditionalDriver",
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
    },
    cancelRequest: {
      type: Boolean,
      default: false,
    },
    sessionId: {
      type: String,
      index: true,
    },
    paymentType: String,
    paymentIntentId: {
      type: String,
    },
    customerId: {
      type: String,
    },
    expireAt: {
      //
      // Bookings created from checkout with Stripe are temporary and
      // are automatically deleted if the payment checkout session expires.
      //
      type: Date,
      index: {
        name: BOOKING_EXPIRE_AT_INDEX_NAME,
        expireAfterSeconds: env.BOOKING_EXPIRE_AT,
        background: true,
      },
    },
    beneficiary: {
      fullName: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "is not valid"],
        trim: true,
      },
      phone: {
        type: String,
        validate: {
          validator: (value: string) => {
            // Check if value is empty then return true.
            if (!value) {
              return true;
            }

            // If value is empty will not validate for mobile phone.
            return validator.isMobilePhone(value);
          },
          message: "{VALUE} is not valid",
        },
        trim: true,
      },
      birthDate: Date,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "Booking",
  }
);

const Booking = model<env.Booking>("Booking", bookingSchema);

export default Booking;

import process from "node:process";
import { Document, Types } from "mongoose";
import { CookieOptions } from "express";
import * as bookcarsTypes from ":bookcars-types";
import * as helper from "../common/helper";

/**
 * Get environment variable value.
 *
 * @param {string} name
 * @param {?boolean} [required]
 * @param {?string} [defaultValue]
 * @returns {string}
 */
export const __env__ = (name: string, required?: boolean, defaultValue?: string): string => {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`'${name} not found`);
  }
  if (!value) {
    return defaultValue || "";
  }
  return String(value);
};

/**
 * ISO 639-1 language codes supported
 * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 *
 * @type {string[]}
 */
export const LANGUAGES = ["en", "es"];

/**
 * Server Port. Default is 4002.
 *
 * @type {number}
 */
export const PORT = Number.parseInt(__env__("BC_PORT", false, "4002"), 10);

/**
 * Indicate whether HTTPS is enabled or not.
 *
 * @type {boolean}
 */
export const HTTPS = helper.StringToBoolean(__env__("BC_HTTPS"));

/**
 * Indicate whether HTTPS is enabled or not.
 *
 * @type {boolean}
 */
export const HTTPS_CLIENT = helper.StringToBoolean(__env__("BC_HTTPS_CLIENT"));

/**
 * Private SSL key filepath.
 *
 * @type {string}
 */
export const PRIVATE_KEY = __env__("BC_PRIVATE_KEY", HTTPS);

/**
 * Private SSL certificate filepath.
 *
 * @type {string}
 */
export const CERTIFICATE = __env__("BC_CERTIFICATE", HTTPS);

/**
 * MongoDB database URI. Default is: mongodb://127.0.0.1:27017/bookcars?authSource=admin&appName=bookcars
 *
 * @type {string}
 */
export const DB_URI = __env__("BC_DB_URI", false, "mongodb://127.0.0.1:27017/bookcars?authSource=admin&appName=bookcars");

/**
 * Indicate whether MongoDB SSL is enabled or not.
 *
 * @type {boolean}
 */
export const DB_SSL = helper.StringToBoolean(__env__("BC_DB_SSL", false, "false"));

/**
 * MongoDB SSL certificate filepath.
 *
 * @type {string}
 */
export const DB_SSL_CERT = __env__("BC_DB_SSL_CERT", DB_SSL);

/**
 * MongoDB SSL CA certificate filepath.
 *
 * @type {string}
 */
export const DB_SSL_CA = __env__("BC_DB_SSL_CA", DB_SSL);

/**
 * Indicate whether MongoDB debug is enabled or not.
 *
 * @type {boolean}
 */
export const DB_DEBUG = helper.StringToBoolean(__env__("BC_DB_DEBUG", false, "false"));

/**
 * Cookie secret. It should at least be 32 characters long, but the longer the better.
 *
 * @type {string}
 */
export const COOKIE_SECRET = __env__("BC_COOKIE_SECRET", false, "QualityCars");

/**
 * Authentication cookie domain.
 * Default is localhost.
 *
 * @type {string}
 */
export const AUTH_COOKIE_DOMAIN = __env__("BC_AUTH_COOKIE_DOMAIN", false, "localhost");

/**
 * Cookie options.
 *
 * On production, authentication cookies are httpOnly, signed, secure and strict sameSite.
 * This will prevent XSS attacks by not allowing access to the cookie via JavaScript.
 * This will prevent CSRF attacks by not allowing the browser to send the cookie along with cross-site requests.
 * This will prevent MITM attacks by only allowing the cookie to be sent over HTTPS.
 * Authentication cookies are protected against XST attacks as well by disabling TRACE HTTP method via allowedMethods middleware.
 *
 * @type {CookieOptions}
 */
export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: HTTPS_CLIENT,
  signed: true,
  sameSite: "strict",
  domain: AUTH_COOKIE_DOMAIN,
};

/**
 * frontend authentication cookie name.
 *
 * @type {"bc-x-access-token-frontend"}
 */
export const FRONTEND_AUTH_COOKIE_NAME = "bc-x-access-token-frontend";

/**
 * Backend authentication cookie name.
 *
 * @type {"bc-x-access-token-frontend"}
 */
export const BACKEND_AUTH_COOKIE_NAME = "bc-x-access-token-backend";

/**
 * Mobile App and unit tests authentication header name.
 *
 * @type {"x-access-token"}
 */
export const X_ACCESS_TOKEN = "x-access-token";

/**
 * JWT secret. It should at least be 32 characters long, but the longer the better.
 *
 * @type {string}
 */
export const JWT_SECRET = __env__("BC_JWT_SECRET", false, "QualityCars");

/**
 * JWT expiration in seconds. Default is 86400 seconds (1 day).
 *
 * @type {number}
 */
export const JWT_EXPIRE_AT = Number.parseInt(__env__("BC_JWT_EXPIRE_AT", false, "86400"), 10);

/**
 * Validation Token expiration in seconds. Default is 86400 seconds (1 day).
 *
 * @type {number}
 */
export const TOKEN_EXPIRE_AT = Number.parseInt(__env__("BC_TOKEN_EXPIRE_AT", false, "86400"), 10);

/**
 * SMTP host.
 *
 * @type {string}
 */
export const SMTP_HOST = __env__("BC_SMTP_HOST", true);

/**
 * SMTP port.
 *
 * @type {number}
 */
export const SMTP_PORT = Number.parseInt(__env__("BC_SMTP_PORT", true), 10);

/**
 * SMTP username.
 *
 * @type {string}
 */
export const SMTP_USER = __env__("BC_SMTP_USER", true);

/**
 * SMTP password.
 *
 * @type {string}
 */
export const SMTP_PASS = __env__("BC_SMTP_PASS", true);

/**
 * SMTP from email.
 *
 * @type {string}
 */
export const SMTP_FROM = __env__("BC_SMTP_FROM", true);

/**
 * Users' cdn folder path.
 *
 * @type {string}
 */
export const CDN_USERS = __env__("BC_CDN_USERS", true);

/**
 * Users' temp cdn folder path.
 *
 * @type {string}
 */
export const CDN_TEMP_USERS = __env__("BC_CDN_TEMP_USERS", true);

/**
 * Cars' cdn folder path.
 *
 * @type {string}
 */
export const CDN_CARS = __env__("BC_CDN_CARS", true);

/**
 * Cars' temp cdn folder path.
 *
 * @type {string}
 */
export const CDN_TEMP_CARS = __env__("BC_CDN_TEMP_CARS", true);

/**
 * Backend host.
 *
 * @type {string}
 */
export const BACKEND_HOST = __env__("BC_BACKEND_HOST", true);

/**
 * Backend Domain.
 *
 * @type {string}
 */
export const BACKEND_DOMAIN = __env__("BC_BACKEND_DOMAIN", true);

/**
 * Frontend host.
 *
 * @type {string}
 */
export const FRONTEND_HOST = __env__("BC_FRONTEND_HOST", true);

/**
 * Frontend domain.
 *
 * @type {string}
 */
export const FRONTEND_DOMAIN = __env__("BC_FRONTEND_DOMAIN", true);

/**
 * Default language. Default is en. Available options: en, es.
 *
 * @type {string}
 */
export const DEFAULT_LANGUAGE = __env__("BC_DEFAULT_LANGUAGE", false, "es");

/**
 * Default Minimum age for rental. Default is 21 years.
 *
 * @type {number}
 */
export const MINIMUM_AGE = Number.parseInt(__env__("BC_MINIMUM_AGE", false, "21"), 10);

/**
 * Expo push access token.
 *
 * @type {string}
 */
export const EXPO_ACCESS_TOKEN = __env__("BC_EXPO_ACCESS_TOKEN", false);

/**
 * Stripe secret key.
 *
 * @type {string}
 */
export const STRIPE_SECRET_KEY = __env__("BC_STRIPE_SECRET_KEY", false, "STRIPE_SECRET_KEY");

let stripeSessionExpireAt = Number.parseInt(__env__("BC_STRIPE_SESSION_EXPIRE_AT", false, "82800"), 10);
stripeSessionExpireAt = stripeSessionExpireAt < 1800 ? 1800 : stripeSessionExpireAt;
stripeSessionExpireAt = stripeSessionExpireAt <= 82800 ? stripeSessionExpireAt : 82800;

/**
 * Stripe Checkout Session expiration in seconds. Should be at least 1800 seconds (30min) and max 82800 seconds. Default is 82800 seconds (~23h).
 * If the value is lower than 1800 seconds, it wil be set to 1800 seconds.
 * If the value is greater than 82800 seconds, it wil be set to 82800 seconds.
 *
 * @type {number}
 */
export const STRIPE_SESSION_EXPIRE_AT = stripeSessionExpireAt;

/**
 * Booking expiration in seconds.
 * Bookings created from checkout with Stripe are temporary and are automatically deleted if the payment checkout session expires.
 *
 * @type {number}
 */
export const BOOKING_EXPIRE_AT = STRIPE_SESSION_EXPIRE_AT + 10 * 60;

/**
 * Private SSL key filepath.
 *
 * @type {string}
 */
export const ADMIN_EMAIL = __env__("BC_ADMIN_EMAIL", false);

/**
 * Google reCAPTCHA v3 secret key.
 *
 * @type {string}
 */
export const RECAPTCHA_SECRET = __env__("BC_RECAPTCHA_SECRET", false);

/**
 * Alchemy key.
 *
 * @type {string}
 */
export const ALCHEMY_APIKEY: string = __env__("BC_ALCHEMY_APIKEY", false);

// /**
//  * Tron address.
//  *
//  * @type {string}
//  */
// export const TRON_ADDRESS: string = __env__("BC_TRON_ADDRESS", false);

// /**
//  * Ethereum address.
//  *
//  * @type {string}
//  */
// export const ETH_ADDRESS: string = __env__("BC_ETH_ADDRESS", false);

/**
 * User Document.
 *
 * @export
 * @interface User
 * @typedef {User}
 * @extends {Document}
 */
export interface User extends Document {
  supplier?: Types.ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  password?: string;
  birthDate?: Date;
  verified?: boolean;
  verifiedAt?: Date;
  active?: boolean;
  language: string;
  enableEmailNotifications?: boolean;
  avatar?: string;
  bio?: string;
  location?: string;
  type?: bookcarsTypes.UserType;
  blacklisted?: boolean;
  payLater?: boolean;
  customerId?: string;
  documentType?: number;
  documentNumber?: string;
  enterprise?: {
    name?: string;
    commercialActivity?: string;
    web?: string;
    email?: string;
    rif?: string;
    address?: string;
  };
}

/**
 * UserInfo.
 *
 * @export
 * @interface UserInfo
 * @typedef {UserInfo}
 */
export interface UserInfo {
  _id?: Types.ObjectId;
  supplier?: Types.ObjectId;
  fullName: string;
  email?: string;
  phone?: string;
  password?: string;
  birthDate?: Date;
  verified?: boolean;
  verifiedAt?: Date;
  active?: boolean;
  language?: string;
  enableEmailNotifications?: boolean;
  avatar?: string;
  bio?: string;
  location?: string;
  type?: string;
  blacklisted?: boolean;
  payLater?: boolean;
}

/**
 * AdditionalDriver.
 *
 * @export
 * @interface AdditionalDriver
 * @typedef {AdditionalDriver}
 */
export interface AdditionalDriver {
  fullName: string;
  email: string;
  phone: string;
  birthDate: Date;
}

/**
 * Booking Document.
 *
 * @export
 * @interface Booking
 * @typedef {Booking}
 * @extends {Document}
 */
export interface Booking extends Document {
  _id: Types.ObjectId;
  supplier: Types.ObjectId;
  car: Types.ObjectId;
  driver: Types.ObjectId;
  pickupLocation: Types.ObjectId;
  dropOffLocation: Types.ObjectId;
  from: Date;
  to: Date;
  status: bookcarsTypes.BookingStatus;
  cancellation?: boolean;
  // amendments?: boolean;
  gps?: boolean;
  homeDelivery?: boolean;
  babyChair?: boolean;
  theftProtection?: boolean;
  collisionDamageWaiver?: boolean;
  fullInsurance?: boolean;
  additionalDriver?: boolean;
  _additionalDriver?: Types.ObjectId;
  cancelRequest?: boolean;
  price: number;
  sessionId?: string;
  // paymentType?: string;
  paymentIntentId?: string;
  customerId?: string;
  expireAt?: Date;
  beneficiary?: {
    fullName?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
  };
  payments?: [
    {
      paymentType: string;
      amount: number;
      ref?: string;
      createdAt?: Date;
    },
  ];
  payLaterFee?: number;
}

/**
 * Car Document.
 *
 * @export
 * @interface Car
 * @typedef {Car}
 * @extends {Document}
 */
export interface Car extends Document {
  name: string;
  supplier?: Types.ObjectId;
  // suppliers?: { supplier: Types.ObjectId; inventory: number }[];
  minimumAge: number;
  locations?: Types.ObjectId[];
  // price: number;
  // deposit: number;
  // available: boolean;
  type: bookcarsTypes.CarType;
  gearbox: bookcarsTypes.GearboxType;
  aircon: boolean;
  image: string | null;
  seats: number;
  doors: number;
  status: string;
  // fuelPolicy: bookcarsTypes.FuelPolicy;
  // mileage: number;
  // cancellation: number;
  // amendments: number;
  // gps: number;
  // theftProtection: number;
  // collisionDamageWaiver: number;
  // fullInsurance: number;
  // additionalDriver: number;
  // homeDelivery: number;
  // babyChair: number;
  // inventory: number;
}

/**
 * CarInfo.
 *
 * @export
 * @interface CarInfo
 * @typedef {CarInfo}
 */
export interface CarInfo {
  _id?: Types.ObjectId;
  name: string;
  supplier?: UserInfo;
  minimumAge?: number;
  locations?: Types.ObjectId[];
  price?: number;
  deposit?: number;
  available?: boolean;
  type?: bookcarsTypes.CarType;
  gearbox?: bookcarsTypes.GearboxType;
  aircon?: boolean;
  image?: string;
  seats?: number;
  doors?: number;
  fuelPolicy?: bookcarsTypes.FuelPolicy;
  mileage?: number;
  cancellation?: number;
  amendments?: number;
  theftProtection?: number;
  collisionDamageWaiver?: number;
  fullInsurance?: number;
  additionalDriver?: number;
}

/**
 * CarInfo.
 *
 * @export
 * @interface CarInfo
 * @typedef {CarInfo}
 */
export interface CarSupplierInfo {
  _id?: Types.ObjectId;
  car?: bookcarsTypes.Car;
  name: string;
  supplier?: UserInfo;
  minimumAge?: number;
  locations?: Types.ObjectId[];
  price?: number;
  deposit?: number;
  available?: boolean;
  type?: bookcarsTypes.CarType;
  gearbox?: bookcarsTypes.GearboxType;
  aircon?: boolean;
  image?: string;
  seats?: number;
  doors?: number;
  fuelPolicy?: bookcarsTypes.FuelPolicy;
  mileage?: number;
  cancellation?: number;
  amendments?: number;
  theftProtection?: number;
  collisionDamageWaiver?: number;
  fullInsurance?: number;
  additionalDriver?: number;
}

/**
 * Car Document.
 *
 * @export
 * @interface CarSupplier
 * @typedef {CarSupplier}
 * @extends {Document}
 */
export interface CarSupplier extends Document {
  car: Types.ObjectId;
  supplier: Types.ObjectId;
  minimumAge: number;
  locations: Types.ObjectId[];
  price: number;
  deposit: number;
  available: boolean;
  fuelPolicy: bookcarsTypes.FuelPolicy;
  mileage: number;
  cancellation: number;
  // amendments: number;
  gps: number;
  theftProtection: number;
  collisionDamageWaiver: number;
  fullInsurance: number;
  additionalDriver: number;
  homeDelivery: number;
  babyChair: number;
  inventory: number;
  status: string;
  payLaterFee?: number;
}

/**
 * BookingInfo.
 *
 * @export
 * @interface BookingInfo
 * @typedef {BookingInfo}
 */
export interface BookingInfo {
  _id?: Types.ObjectId;
  supplier: UserInfo;
  car: Car;
  driver: UserInfo;
  pickupLocation: Types.ObjectId;
  dropOffLocation: Types.ObjectId;
  from: Date;
  to: Date;
  status: bookcarsTypes.BookingStatus;
  cancellation?: boolean;
  amendments?: boolean;
  theftProtection?: boolean;
  collisionDamageWaiver?: boolean;
  fullInsurance?: boolean;
  additionalDriver?: boolean;
  _additionalDriver?: Types.ObjectId;
  cancelRequest?: boolean;
  price: number;
}

/**
 * Location Document.
 *
 * @export
 * @interface Location
 * @typedef {Location}
 * @extends {Document}
 */
export interface Location extends Document {
  values: Types.ObjectId[];
  name?: string;
  coordinates: number[];
}

/**
 * LocationValue Document.
 *
 * @export
 * @interface LocationValue
 * @typedef {LocationValue}
 * @extends {Document}
 */
export interface LocationValue extends Document {
  language: string;
  value: string;
}

/**
 *LocationInfo.
 *
 * @export
 * @interface LocationInfo
 * @typedef {LocationInfo}
 */
export interface LocationInfo {
  _id?: Types.ObjectId;
  name?: string;
  values: LocationValue[];
}

/**
 * Country Document.
 *
 * @export
 * @interface Country
 * @typedef {Country}
 * @extends {Document}
 */
export interface Country extends Document {
  code: string;
  values: Types.ObjectId[];
  name?: string;
}

/**
 * CountryValue Document.
 *
 * @export
 * @interface CountryValue
 * @typedef {CountryValue}
 * @extends {Document}
 */
export interface CountryValue extends Document {
  language: string;
  value: string;
}

/**
 * Notification Document.
 *
 * @export
 * @interface Notification
 * @typedef {Notification}
 * @extends {Document}
 */
export interface Notification extends Document {
  user: Types.ObjectId;
  message: string;
  booking: Types.ObjectId;
  isRead?: boolean;
}

/**
 * NotificationCounter Document.
 *
 * @export
 * @interface NotificationCounter
 * @typedef {NotificationCounter}
 * @extends {Document}
 */
export interface NotificationCounter extends Document {
  user: Types.ObjectId;
  count?: number;
}

/**
 * PushToken Document.
 *
 * @export
 * @interface PushToken
 * @typedef {PushToken}
 * @extends {Document}
 */
export interface PushToken extends Document {
  user: Types.ObjectId;
  token: string;
}

/**
 * Token Document.
 *
 * @export
 * @interface Token
 * @typedef {Token}
 * @extends {Document}
 */
export interface Token extends Document {
  user: Types.ObjectId;
  token: string;
  expireAt?: Date;
}

/**
 * Wallet Document.
 *
 * @export
 * @interface Wallet
 * @typedef {Wallet}
 * @extends {Document}
 */
export interface Wallet extends Document {
  network: string;
  address?: string;
}

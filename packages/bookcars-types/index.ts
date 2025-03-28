export enum UserType {
  Admin = "admin",
  Supplier = "supplier",
  Enterprise = "enterprise",
  User = "user",
}

export enum AppType {
  Backend = "backend",
  Frontend = "frontend",
  Enterprise = "enterprise",
}

export enum CarType {
  Diesel = "diesel",
  Gasoline = "gasoline",
  Electric = "electric",
  Hybrid = "hybrid",
  PlugInHybrid = "plugInHybrid",
  Unknown = "unknown",
}

export enum CarStatus {
  Active = "active",
  Deleted = "deleted",
}

export enum GearboxType {
  Manual = "manual",
  Automatic = "automatic",
}

export enum FuelPolicy {
  LikeForlike = "likeForlike",
  FreeTank = "freeTank",
}

export enum BookingStatus {
  Void = "void",
  Pending = "pending",
  Deposit = "deposit",
  Paid = "paid",
  Reserved = "reserved",
  Cancelled = "cancelled",
  Deleted = "deleted",
}

export enum Mileage {
  Limited = "limited",
  Unlimited = "unlimited",
}

export enum Availablity {
  Available = "available",
  Unavailable = "unavailable",
}

export enum RecordType {
  Admin = "admin",
  Supplier = "supplier",
  Enterprise = "enterprise",
  User = "user",
  Car = "car",
  Location = "location",
}

export enum DocumentType {
  IdentityCard = "1",
  Passport = "2",
}

export enum PaymentType {
  CardPayment = "cardPayment",
  PayLater = "payLater",
  MobilePayment = "mobilePayment",
  WalletPayment = "walletPayment",
  Cash = "Cash",
  PointOfSell = "PointOfSell",
}

export interface Booking {
  _id?: string;
  supplier: string | User;
  car: string | CarSupplier;
  driver?: string | User;
  pickupLocation: string | Location;
  dropOffLocation: string | Location;
  from: Date;
  to: Date;
  status: BookingStatus;
  cancellation?: boolean;
  //amendments?: boolean;
  gps?: boolean;
  homeDelivery?: boolean;
  babyChair?: boolean;
  theftProtection?: boolean;
  collisionDamageWaiver?: boolean;
  fullInsurance?: boolean;
  additionalDriver?: boolean;
  _additionalDriver?: string | AdditionalDriver;
  cancelRequest?: boolean;
  price?: number;
  sessionId?: string;
  paymentIntentId?: string;
  customerId?: string;
  expireAt?: Date;
  beneficiary?: BookingBeneficiary;
  // paymentType?: string;
  payments?: [Payment];
  payLaterFee?: number;
}

export interface Payment {
  _id?: string;
  paymentType: string;
  amount?: number;
  ref?: string;
  createdAt?: Date;
}
export interface InsertPaymentPayload extends Payment {
  booking?: string;
}

export interface WalletAddress {
  address?: string;
}

export interface BookingBeneficiary {
  fullName?: string;
  email?: string;
  phone?: string;
  birthDate?: Date;
}

export interface CheckoutPayload {
  driver?: User;
  booking?: Booking;
  additionalDriver?: AdditionalDriver;
  payLater?: boolean;
  sessionId?: string;
  paymentIntentId?: string;
  paymentType?: string;
  customerId?: string;
}

export interface Filter {
  from?: Date;
  to?: Date;
  keyword?: string;
  pickupLocation?: string;
  dropOffLocation?: string;
}

export interface GetBookingsPayload {
  suppliers: string[];
  statuses: string[];
  user?: string;
  car?: string;
  filter?: Filter;
}

export interface AdditionalDriver {
  fullName: string;
  email: string;
  phone: string;
  birthDate: Date;
}

export interface UpsertBookingPayload {
  booking: Booking;
  additionalDriver?: AdditionalDriver;
}

export interface LocationName {
  language: string;
  name: string;
}

export interface UpdateSupplierPayload {
  _id: string;
  fullName: string;
  phone: string;
  location: string;
  bio: string;
  payLater: boolean;
}

export interface CreateCarPayload {
  name: string;
  // supplier: string;
  // suppliers?: { supplier: string; inventory: number }[];
  minimumAge: number;
  // locations: string[];
  // price: number;
  // deposit: number;
  // available: boolean;
  type: string;
  gearbox: string;
  aircon: boolean;
  image?: string;
  seats: number;
  doors: number;
  // fuelPolicy: string;
  // mileage: number;
  // cancellation: number;
  // // amendments: number
  // gps: number;
  // theftProtection: number;
  // collisionDamageWaiver: number;
  // fullInsurance: number;
  // additionalDriver: number;
  // homeDelivery: number;
  // babyChair: number;
  // inventory?: number;
}

export interface AssignCarPayload {
  car: string;
  supplier: string;
  locations: string[];
  price: number;
  deposit: number;
  available: boolean;
  fuelPolicy: string;
  mileage: number;
  cancellation: number;
  gps: number;
  theftProtection: number;
  collisionDamageWaiver: number;
  fullInsurance: number;
  additionalDriver: number;
  homeDelivery: number;
  babyChair: number;
  inventory: number;
  payLaterFee?: number;
}

export interface UpdateCarPayload extends CreateCarPayload {
  _id: string;
}

export interface UpdateCarAssignPayload extends AssignCarPayload {
  _id: string;
}

export interface CarSpecs {
  aircon?: boolean;
  moreThanFourDoors?: boolean;
  moreThanFiveSeats?: boolean;
}

export interface GetCarsPayload {
  suppliers?: string[];
  carSpecs?: CarSpecs;
  carType?: string[];
  gearbox?: string[];
  mileage?: string[];
  fuelPolicy?: string[];
  deposit?: number;
  availability?: string[];
  pickupLocation?: string;
  from?: Date;
  to?: Date;
}

export interface SignUpPayload {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  language: string;
  active?: boolean;
  verified?: boolean;
  blacklisted?: boolean;
  type?: string;
  avatar?: string;
  birthDate?: number | Date;
}

export interface CreateUserPayload {
  email?: string;
  phone: string;
  location: string;
  bio: string;
  fullName: string;
  type?: string;
  avatar?: string;
  birthDate?: number | Date;
  language?: string;
  password?: string;
  verified?: boolean;
  blacklisted?: boolean;
  payLater?: boolean;
  supplier?: string;
  documentType?: string;
  documentNumber?: string;
  enterprise?: {
    name: string;
    commercialActivity: string;
    web?: string;
    email: string;
    rif: string;
    address: string;
  };
}

export interface UpdateUserPayload extends CreateUserPayload {
  _id: string;
  enableEmailNotifications?: boolean;
  payLater?: boolean;
}

export interface ChangePasswordPayload {
  _id: string;
  password: string;
  newPassword: string;
  strict: boolean;
}

export interface ActivatePayload {
  userId: string;
  token: string;
  password: string;
}

export interface ValidateEmailPayload {
  email: string;
}

export interface ValidateCarAssignPayload {
  supplier: string;
  car: string;
  carSupplier?: string;
}

export interface CheckAvailabilityPayload {
  car: string;
  from: Date;
  to: Date;
}

export interface CheckWalletPaymentPayload {
  transactionId: string;
  amountToValidate?: number;
}

export interface SignInPayload {
  email: string;
  password?: string;
  stayConnected?: boolean;
  mobile?: boolean;
}

export interface ResendLinkPayload {
  email?: string;
}

export interface UpdateEmailNotificationsPayload {
  _id: string;
  enableEmailNotifications: boolean;
}

export interface UpdateLanguagePayload {
  id: string;
  language: string;
}

export interface ValidateSupplierPayload {
  fullName: string;
}

export interface ValidateEnterprisePayload {
  enterpriseName: string;
}

export interface ValidateRifPayload {
  rif: string;
}

export interface ValidateLocationPayload {
  language: string;
  name: string;
}

export interface UpdateStatusPayload {
  ids: string[];
  status: string;
}

export interface User {
  _id?: string;
  supplier?: User | string;
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
  accessToken?: string;
  checked?: boolean;
  customerId?: string;
  carCount?: number;
  documentType?: number;
  documentNumber?: string;
  enterprise?: {
    name: string;
    commercialActivity: string;
    web?: string;
    email: string;
    rif: string;
    address: string;
  };
}

export interface Option {
  _id: string;
  name?: string;
  image?: string;
}

export interface LocationValue {
  language: string;
  value?: string;
  name?: string;
}

export interface Location {
  _id: string;
  name?: string;
  values?: LocationValue[];
}

export interface MobilePaymentPayload {
  reference?: string;
  date?: Date;
  phone?: string;
  bankId?: string;
}

export interface Car {
  _id: string;
  name: string;
  supplier: User;
  minimumAge: number;
  locations: Location[];
  price: number;
  deposit: number;
  available: boolean;
  type: CarType;
  gearbox: GearboxType;
  aircon: boolean;
  image?: string;
  seats: number;
  doors: number;
  fuelPolicy: FuelPolicy;
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
  payLaterFee?: number;
  [propKey: string]: any;
}

export interface CarSupplier {
  _id: string;
  car: Car;
  supplier: User;
  locations: Location[];
  price: number;
  deposit: number;
  available: boolean;
  fuelPolicy: FuelPolicy;
  mileage: number;
  cancellation: number;
  gps: number;
  theftProtection: number;
  collisionDamageWaiver: number;
  fullInsurance: number;
  additionalDriver: number;
  homeDelivery: number;
  babyChair: number;
  inventory: number;
  name?: string;
  minimumAge?: number;
  image?: string;
  payLaterFee?: number;
  [propKey: string]: any;
}

export interface Data<T> {
  rows: T[];
  rowCount: number;
}

export interface GetBookingCarsPayload {
  supplier: string;
  pickupLocation: string;
}

export interface Notification {
  _id: string;
  user: string;
  message: string;
  booking?: string;
  isRead?: boolean;
  checked?: boolean;
  createdAt?: Date;
}

export interface NotificationCounter {
  _id: string;
  user: string;
  count: number;
}

export interface ResultData<T> {
  pageInfo: { totalRecords: number };
  resultData: T[];
}

export type Result<T> = [ResultData<T>] | [] | undefined | null;

export interface GetUsersBody {
  user: string;
  types: UserType[];
}

export interface CreatePaymentPayload {
  amount: number;
  /**
   * Three-letter ISO currency code, in lowercase.
   * Must be a supported currency: https://docs.stripe.com/currencies
   *
   * @type {string}
   */
  currency: string;
  /**
   * The IETF language tag of the locale Checkout is displayed in. If blank or auto, the browser's locale is used.
   *
   * @type {string}
   */
  locale: string;
  receiptEmail: string;
  customerName: string;
  name: string;
  description?: string;
  isDirect?: boolean;
}

export interface PaymentResult {
  sessionId?: string;
  paymentIntentId?: string;
  customerId: string;
  clientSecret: string | null;
}

export interface SendEmailPayload {
  from: string;
  to: string;
  subject: string;
  message: string;
  recaptchaToken: string;
  ip: string;
}

//
// React types
//
export type DataEvent<T> = (data?: Data<T>) => void;

export interface StatusFilterItem {
  label: string;
  value: BookingStatus;
  checked?: boolean;
}

export interface CarFilter {
  pickupLocation: Location;
  dropOffLocation: Location;
  from: Date;
  to: Date;
}

export type CarFilterSubmitEvent = (filter: CarFilter) => void;

export interface CarOptions {
  cancellation?: boolean;
  // amendments?: boolean;
  gps?: boolean;
  homeDelivery?: boolean;
  babyChair?: boolean;
  theftProtection?: boolean;
  collisionDamageWaiver?: boolean;
  fullInsurance?: boolean;
  additionalDriver?: boolean;
  paylater?: boolean;
}

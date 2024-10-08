import * as bookcarsTypes from ":bookcars-types";
import axiosInstance from "./axiosInstance";
import * as UserService from "./UserService";

/**
 * Complete the checkout process and create the Booking.
 *
 * @param {bookcarsTypes.CheckoutPayload} data
 * @returns {Promise<number>}
 */
export const checkout = (data: bookcarsTypes.CheckoutPayload): Promise<{ status: number; bookingId: string }> =>
  axiosInstance.post("/api/checkout", data).then((res) => ({ status: res.status, bookingId: res.data.bookingId }));

/**
 * Update a Booking.
 *
 * @param {bookcarsTypes.UpsertBookingPayload} data
 * @returns {Promise<number>}
 */
export const update = (data: bookcarsTypes.UpsertBookingPayload): Promise<number> =>
  axiosInstance.put("/api/update-booking", data, { withCredentials: true }).then((res) => res.status);

/**
 * Get bookings.
 *
 * @param {bookcarsTypes.GetBookingsPayload} payload
 * @param {number} page
 * @param {number} size
 * @returns {Promise<bookcarsTypes.Result<bookcarsTypes.Booking>>}
 */
export const getBookings = (payload: bookcarsTypes.GetBookingsPayload, page: number, size: number): Promise<bookcarsTypes.Result<bookcarsTypes.Booking>> =>
  axiosInstance.post(`/api/bookings/${page}/${size}/${UserService.getLanguage()}`, payload, { withCredentials: true }).then((res) => res.data);

/**
 * Get a Booking by ID.
 *
 * @param {string} id
 * @returns {Promise<bookcarsTypes.Booking>}
 */
export const getBooking = (id: string): Promise<bookcarsTypes.Booking> =>
  axiosInstance.get(`/api/booking/${encodeURIComponent(id)}/${UserService.getLanguage()}`, { withCredentials: true }).then((res) => res.data);

/**
 * Cancel a Booking.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const cancel = (id: string): Promise<number> =>
  axiosInstance
    .post(`/api/cancel-booking/${encodeURIComponent(id)}`, null, {
      withCredentials: true,
    })
    .then((res) => res.status);

/**
 * Delete temporary Booking created from checkout session.
 *
 * @param {string} bookingId
 * @param {string} sessionId
 * @returns {Promise<number>}
 */
export const deleteTempBooking = (bookingId: string, sessionId: string): Promise<number> =>
  axiosInstance.delete(`/api/delete-temp-booking/${bookingId}/${sessionId}`).then((res) => res.status);

/**
 * Check Booking availability.
 *
 * @param {bookcarsTypes.CheckAvailabilityPayload} data
 * @returns {Promise<number>}
 */
export const checkAvailability = (data: bookcarsTypes.CheckAvailabilityPayload): Promise<number> =>
  axiosInstance.post("/api/check-availability", data).then((exist) => exist.status);

/**
 * Check Wallet Payment.
 *
 * @param {bookcarsTypes.CheckWalletPaymentPayload} data
 * @returns {Promise<number>}
 */
export const checkWalletPayment = (data: bookcarsTypes.CheckWalletPaymentPayload): Promise<number> =>
  axiosInstance.post("/api/check-wallet-payment", data).then((exist) => exist.status);

/**
 * Check Wallet Tron Payment.
 *
 * @param {bookcarsTypes.CheckWalletPaymentPayload} data
 * @returns {Promise<number>}
 */
export const checkWalletTronPayment = (data: bookcarsTypes.CheckWalletPaymentPayload): Promise<number> =>
  axiosInstance.post("/api/check-tron-payment", data).then((exist) => exist.status);

/**
 * Check Wallet Eth Payment.
 *
 * @param {bookcarsTypes.CheckWalletPaymentPayload} data
 * @returns {Promise<number>}
 */
export const checkWalletEthPayment = (data: bookcarsTypes.CheckWalletPaymentPayload): Promise<number> =>
  axiosInstance.post("/api/check-eth-payment", data).then((exist) => exist.status);

/**
 * Get Wallet address by network.
 *
 * @param {string} network
 * @returns {Promise<bookcarsTypes.WalletAddress>}
 */
export const getWalletAddress = (network: string): Promise<bookcarsTypes.WalletAddress> =>
  axiosInstance.get(`/api/wallet-address/${network}`, { withCredentials: true }).then((res) => res.data);

import * as bookcarsTypes from ":bookcars-types";
import axiosInstance from "./axiosInstance";
import * as UserService from "./UserService";

/**
 * Get cars.
 *
 * @param {bookcarsTypes.GetCarsPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<bookcarsTypes.Result<bookcarsTypes.CarSupplier>>}
 */
export const getCars = (data: bookcarsTypes.GetCarsPayload, page: number, size: number): Promise<bookcarsTypes.Result<bookcarsTypes.CarSupplier>> =>
  axiosInstance.post(`/api/frontend-cars/${page}/${size}`, data).then((res) => res.data);

/**
 * Get a Car by ID.
 *
 * @param {string} id
 * @returns {Promise<bookcarsTypes.Car>}
 */
export const getCar = (id: string): Promise<bookcarsTypes.CarSupplier> =>
  axiosInstance.get(`/api/car-supplier/${encodeURIComponent(id)}/${UserService.getLanguage()}`).then((res) => res.data);

/**
 * Get a CarSupplier by ID.
 *
 * @param {string} id
 * @returns {Promise<bookcarsTypes.Car>}
 */
export const getCarSupplier = (id: string): Promise<bookcarsTypes.CarSupplier> =>
  axiosInstance
    .get(`/api/car-supplier/${encodeURIComponent(id)}/${UserService.getLanguage()}`, {
      withCredentials: true,
    })
    .then((res) => res.data);

/**
 * Get cars by agency and location.
 *
 * @param {string} keyword
 * @param {bookcarsTypes.GetBookingCarsPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<bookcarsTypes.Car[]>}
 */
export const getBookingCars = (keyword: string, data: bookcarsTypes.GetBookingCarsPayload, page: number, size: number): Promise<bookcarsTypes.Car[]> =>
  axiosInstance.post(`/api/booking-cars/${page}/${size}/?s=${encodeURIComponent(keyword)}`, data, { withCredentials: true }).then((res) => res.data);

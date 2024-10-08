import * as bookcarsTypes from ":bookcars-types";
import axiosInstance from "./axiosInstance";
import * as UserService from "./UserService";

/**
 * Create a Car.
 *
 * @param {bookcarsTypes.CreateCarPayload} data
 * @returns {Promise<bookcarsTypes.Car>}
 */
export const create = (data: bookcarsTypes.CreateCarPayload): Promise<bookcarsTypes.Car> =>
  axiosInstance.post("/api/create-car", data, { withCredentials: true }).then((res) => res.data);

/**
 * Validate car assign.
 *
 * @param {bookcarsTypes.ValidateCarAssignPayload} data
 * @returns {Promise<bookcarsTypes.CarSupplier>}
 */
export const validateAssign = (data: bookcarsTypes.ValidateCarAssignPayload): Promise<number> =>
  axiosInstance.post("/api/validate-car-assign", data, { withCredentials: true }).then((res) => res.status);

/**
 * Assign a Car.
 *
 * @param {bookcarsTypes.AssignCarPayload} data
 * @returns {Promise<bookcarsTypes.CarSupplier>}
 */
export const assign = (data: bookcarsTypes.AssignCarPayload): Promise<bookcarsTypes.CarSupplier> =>
  axiosInstance.post("/api/assign-car", data, { withCredentials: true }).then((res) => res.data);

/**
 * Update a Car.
 *
 * @param {bookcarsTypes.UpdateCarPayload} data
 * @returns {Promise<number>}
 */
export const update = (data: bookcarsTypes.UpdateCarPayload): Promise<number> =>
  axiosInstance.put("/api/update-car", data, { withCredentials: true }).then((res) => res.status);

/**
 * Update a Car Assign.
 *
 * @param {bookcarsTypes.UpdateCarAssignPayload} data
 * @returns {Promise<number>}
 */
export const updateAssign = (data: bookcarsTypes.UpdateCarAssignPayload): Promise<number> =>
  axiosInstance.put("/api/update-car-assign", data, { withCredentials: true }).then((res) => res.status);

/**
 * Check if a Car is related to a booking.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const check = (id: string): Promise<number> =>
  axiosInstance.get(`/api/check-car/${encodeURIComponent(id)}`, { withCredentials: true }).then((res) => res.status);

/**
 * Delete a Car.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteCar = (id: string): Promise<number> =>
  axiosInstance
    .delete(`/api/delete-car/${encodeURIComponent(id)}`, {
      withCredentials: true,
    })
    .then((res) => res.status);

/**
 * Delete a Car Assign.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteCarAssign = (id: string): Promise<number> =>
  axiosInstance
    .delete(`/api/delete-car-assign/${encodeURIComponent(id)}`, {
      withCredentials: true,
    })
    .then((res) => res.status);

/**
 * Create a temporary Car image.
 *
 * @param {Blob} file
 * @returns {Promise<string>}
 */
export const createImage = (file: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  return axiosInstance
    .post("/api/create-car-image", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

/**
 * Update a Car image.
 *
 * @param {string} id
 * @param {Blob} file
 * @returns {Promise<number>}
 */
export const updateImage = (id: string, file: Blob): Promise<number> => {
  const formData = new FormData();
  formData.append("image", file);

  return axiosInstance
    .post(`/api/update-car-image/${encodeURIComponent(id)}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.status);
};

/**
 * Delete a Car image.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteImage = (id: string): Promise<number> =>
  axiosInstance
    .post(`/api/delete-car-image/${encodeURIComponent(id)}`, null, {
      withCredentials: true,
    })
    .then((res) => res.status);

/**
 * Delete a temporary Car image.
 *
 * @param {string} image
 * @returns {Promise<number>}
 */
export const deleteTempImage = (image: string): Promise<number> =>
  axiosInstance
    .post(`/api/delete-temp-car-image/${encodeURIComponent(image)}`, null, {
      withCredentials: true,
    })
    .then((res) => res.status);

/**
 * Get a Car by ID.
 *
 * @param {string} id
 * @returns {Promise<bookcarsTypes.Car>}
 */
export const getCar = (id: string): Promise<bookcarsTypes.Car> =>
  axiosInstance
    .get(`/api/car/${encodeURIComponent(id)}/${UserService.getLanguage()}`, {
      withCredentials: true,
    })
    .then((res) => res.data);

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
 * Get Cars.
 *
 * @param {string} keyword
 * @param {bookcarsTypes.GetCarsPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<bookcarsTypes.Result<bookcarsTypes.Car>>}
 */
export const getCars = (keyword: string, data: bookcarsTypes.GetCarsPayload, page: number, size: number): Promise<bookcarsTypes.Result<bookcarsTypes.Car>> =>
  axiosInstance
    .post(`/api/cars/${page}/${size}/?s=${encodeURIComponent(keyword)}`, data, {
      withCredentials: true,
    })
    .then((res) => res.data);

/**
 * Get Cars by supplier.
 *
 * @param {string} keyword
 * @param {bookcarsTypes.GetCarsPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<bookcarsTypes.Result<bookcarsTypes.Car>>}
 */
export const getSupplierCars = (
  keyword: string,
  data: bookcarsTypes.GetCarsPayload,
  page: number,
  size: number
): Promise<bookcarsTypes.Result<bookcarsTypes.CarSupplier>> =>
  axiosInstance
    .post(`/api/supplier-cars/${page}/${size}/?s=${encodeURIComponent(keyword)}`, data, {
      withCredentials: true,
    })
    .then((res) => res.data);

/**
 * Get Car Models.
 *
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<bookcarsTypes.Car[]>}
 */
export const getModelCars = (keyword: string, page: number, size: number): Promise<bookcarsTypes.Car[]> =>
  axiosInstance.post(`/api/model-cars/${page}/${size}/?s=${encodeURIComponent(keyword)}`, {}, { withCredentials: true }).then((res) => res.data);

/**
 * Get Cars by supplier and location for booking.
 *
 * @param {string} keyword
 * @param {bookcarsTypes.GetBookingCarsPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<bookcarsTypes.Car[]>}
 */
export const getBookingCars = (keyword: string, data: bookcarsTypes.GetBookingCarsPayload, page: number, size: number): Promise<bookcarsTypes.CarSupplier[]> =>
  axiosInstance.post(`/api/booking-cars/${page}/${size}/?s=${encodeURIComponent(keyword)}`, data, { withCredentials: true }).then((res) => res.data);

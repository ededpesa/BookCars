import * as bookcarsTypes from ":bookcars-types";
import axiosInstance from "./axiosInstance";
import env from "../config/env.config";

/**
 * Validate Enterprise name.
 *
 * @param {bookcarsTypes.ValidateEnterprisePayload} data
 * @returns {Promise<number>}
 */
export const validate = (data: bookcarsTypes.ValidateEnterprisePayload): Promise<number> =>
  axiosInstance.post("/api/validate-enterprise", data, { withCredentials: true }).then((res) => res.status);

/**
 * Validate Enterprise Rif.
 *
 * @param {bookcarsTypes.ValidateRifPayload} data
 * @returns {Promise<number>}
 */
export const validateRif = (data: bookcarsTypes.ValidateRifPayload): Promise<number> =>
  axiosInstance.post("/api/validate-rif", data, { withCredentials: true }).then((res) => res.status);

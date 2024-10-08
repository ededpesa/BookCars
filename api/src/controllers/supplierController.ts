import path from "node:path";
import fs from "node:fs/promises";
import escapeStringRegexp from "escape-string-regexp";
import { Request, Response } from "express";
import mongoose from "mongoose";
import * as bookcarsTypes from ":bookcars-types";
import i18n from "../lang/i18n";
import * as env from "../config/env.config";
import User from "../models/User";
import NotificationCounter from "../models/NotificationCounter";
import Notification from "../models/Notification";
import AdditionalDriver from "../models/AdditionalDriver";
import Booking from "../models/Booking";
import Car from "../models/Car";
import CarSupplier from "../models/CarSupplier";
import * as helper from "../common/helper";
import * as logger from "../common/logger";

/**
 * Validate Supplier by fullname.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const validate = async (req: Request, res: Response) => {
  const { body }: { body: bookcarsTypes.ValidateSupplierPayload } = req;
  const { fullName } = body;

  try {
    const keyword = escapeStringRegexp(fullName);
    const options = "i";
    const user = await User.findOne({
      type: bookcarsTypes.UserType.Supplier,
      fullName: { $regex: new RegExp(`^${keyword}$`), $options: options },
    });
    return user ? res.sendStatus(204) : res.sendStatus(200);
  } catch (err) {
    logger.error(`[supplier.validate] ${i18n.t("DB_ERROR")} ${fullName}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Update Supplier.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const update = async (req: Request, res: Response) => {
  const { body }: { body: bookcarsTypes.UpdateSupplierPayload } = req;
  const { _id } = body;

  try {
    if (!helper.isValidObjectId(_id)) {
      throw new Error("body._id is not valid");
    }
    const supplier = await User.findById(_id);

    if (supplier) {
      const { fullName, phone, location, bio, payLater } = body;
      supplier.fullName = fullName;
      supplier.phone = phone;
      supplier.location = location;
      supplier.bio = bio;
      supplier.payLater = payLater;

      await supplier.save();
      return res.json({
        _id,
        fullName: supplier.fullName,
        phone: supplier.phone,
        location: supplier.location,
        bio: supplier.bio,
        payLater: supplier.payLater,
      });
    }
    logger.error("[supplier.update] Supplier not found:", _id);
    return res.sendStatus(204);
  } catch (err) {
    logger.error(`[supplier.update] ${i18n.t("DB_ERROR")} ${_id}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Delete Supplier by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const supplier = await User.findById(id);
    if (supplier) {
      await User.deleteOne({ _id: id });

      if (supplier.avatar) {
        const avatar = path.join(env.CDN_USERS, supplier.avatar);
        if (await helper.exists(avatar)) {
          await fs.unlink(avatar);
        }

        await NotificationCounter.deleteMany({ user: id });
        await Notification.deleteMany({ user: id });
        const additionalDrivers = (await Booking.find({ supplier: id, _additionalDriver: { $ne: null } }, { _id: 0, _additionalDriver: 1 })).map(
          (b) => b._additionalDriver
        );
        await AdditionalDriver.deleteMany({ _id: { $in: additionalDrivers } });
        await Booking.deleteMany({ supplier: id });
        const cars = await Car.find({ supplier: id });
        await Car.deleteMany({ supplier: id });
        for (const car of cars) {
          if (car.image) {
            const image = path.join(env.CDN_CARS, car.image);
            if (await helper.exists(image)) {
              await fs.unlink(image);
            }
          }
        }
      }
    } else {
      return res.sendStatus(204);
    }
    return res.sendStatus(200);
  } catch (err) {
    logger.error(`[supplier.delete] ${i18n.t("DB_ERROR")} ${id}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get Supplier by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).lean();

    if (!user) {
      logger.error("[supplier.getSupplier] Supplier not found:", id);
      return res.sendStatus(204);
    }
    const { _id, email, fullName, avatar, phone, location, bio, payLater } = user;

    return res.json({
      _id,
      email,
      fullName,
      avatar,
      phone,
      location,
      bio,
      payLater,
    });
  } catch (err) {
    logger.error(`[supplier.getSupplier] ${i18n.t("DB_ERROR")} ${id}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get Suppliers.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.params.page, 10);
    const size = Number.parseInt(req.params.size, 10);
    const keyword = escapeStringRegexp(String(req.query.s || ""));
    const options = "i";

    const data = await User.aggregate(
      [
        {
          $match: {
            type: bookcarsTypes.UserType.Supplier,
            fullName: { $regex: keyword, $options: options },
          },
        },
        {
          $facet: {
            resultData: [{ $sort: { fullName: 1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
            pageInfo: [
              {
                $count: "totalRecords",
              },
            ],
          },
        },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } }
    );

    data[0].resultData = data[0].resultData.map((supplier: env.User) => {
      const { _id, fullName, avatar } = supplier;
      return { _id, fullName, avatar };
    });

    return res.json(data);
  } catch (err) {
    logger.error(`[supplier.getSuppliers] ${i18n.t("DB_ERROR")} ${req.query.s}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get all Suppliers.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    let data = await User.aggregate([{ $match: { type: bookcarsTypes.UserType.Supplier } }, { $sort: { fullName: 1, _id: 1 } }], {
      collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 },
    });

    data = data.map((supplier) => {
      const { _id, fullName, avatar } = supplier;
      return { _id, fullName, avatar };
    });

    return res.json(data);
  } catch (err) {
    logger.error(`[supplier.getAllSuppliers] ${i18n.t("DB_ERROR")}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get Frontend Suppliers.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getFrontendSuppliers = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.GetCarsPayload } = req;
    const pickupLocation = new mongoose.Types.ObjectId(body.pickupLocation);
    const { carType, gearbox, mileage, fuelPolicy, deposit, carSpecs } = body;

    const $match: mongoose.FilterQuery<any> = {
      $and: [{ locations: pickupLocation }, { available: true }, { fuelPolicy: { $in: fuelPolicy } }, { status: { $ne: bookcarsTypes.CarStatus.Deleted } }],
    };

    const $match2: mongoose.FilterQuery<any> = {
      $and: [{ type: { $in: carType } }, { gearbox: { $in: gearbox } }],
    };

    if (carSpecs) {
      if (typeof carSpecs.aircon !== "undefined") {
        $match2.$and!.push({ aircon: carSpecs.aircon });
      }
      if (typeof carSpecs.moreThanFourDoors !== "undefined") {
        $match2.$and!.push({ doors: { $gt: 4 } });
      }
      if (typeof carSpecs.moreThanFiveSeats !== "undefined") {
        $match2.$and!.push({ seats: { $gt: 5 } });
      }
    }

    if (mileage) {
      if (mileage.length === 1 && mileage[0] === bookcarsTypes.Mileage.Limited) {
        $match.$and!.push({ mileage: { $gt: -1 } });
      } else if (mileage.length === 1 && mileage[0] === bookcarsTypes.Mileage.Unlimited) {
        $match.$and!.push({ mileage: -1 });
      } else if (mileage.length === 0) {
        return res.json([{ resultData: [], pageInfo: [] }]);
      }
    }

    if (deposit && deposit > -1) {
      $match.$and!.push({ deposit: { $lte: deposit } });
    }

    const data = await CarSupplier.aggregate(
      [
        { $match },
        {
          $lookup: {
            from: "User",
            let: { userId: "$supplier" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$userId"] },
                },
              },
            ],
            as: "supplier",
          },
        },
        { $unwind: { path: "$supplier", preserveNullAndEmptyArrays: false } },
        {
          $lookup: {
            from: "Car", // Unir con la colección Car
            localField: "car", // Campo en CarSupplier
            foreignField: "_id", // Campo en Car
            as: "carDetails", // Resultado del lookup
          },
        },
        { $unwind: "$carDetails" }, // Desenrollar el array carDetails para acceder a los campos directamente
        {
          $addFields: {
            name: "$carDetails.name",
            image: "$carDetails.image",
            type: "$carDetails.type",
            gearbox: "$carDetails.gearbox",
            aircon: "$carDetails.aircon",
            seats: "$carDetails.seats",
            doors: "$carDetails.doors",
          },
        },
        {
          $unset: "carDetails", // Eliminar el campo 'carDetails' del resultado final
        },
        { $match: $match2 },
        {
          $group: {
            _id: "$supplier._id",
            fullName: { $first: "$supplier.fullName" },
            avatar: { $first: "$supplier.avatar" },
            carCount: { $sum: 1 },
          },
        },
        { $sort: { fullName: 1 } },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } }
    );

    return res.json(data);
  } catch (err) {
    logger.error(`[supplier.getFrontendSuppliers] ${i18n.t("DB_ERROR")}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get Backend Suppliers.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getBackendSuppliers = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.GetCarsPayload } = req;
    const { carType, gearbox, mileage, deposit, availability, fuelPolicy, carSpecs } = body;
    const keyword = escapeStringRegexp(String(req.query.s || ""));
    const options = "i";

    const $match: mongoose.FilterQuery<any> = {
      $and: [{ name: { $regex: keyword, $options: options } }, { fuelPolicy: { $in: fuelPolicy } }],
    };

    if (carSpecs) {
      if (typeof carSpecs.aircon !== "undefined") {
        $match.$and!.push({ aircon: carSpecs.aircon });
      }
      if (typeof carSpecs.moreThanFourDoors !== "undefined") {
        $match.$and!.push({ doors: { $gt: 4 } });
      }
      if (typeof carSpecs.moreThanFiveSeats !== "undefined") {
        $match.$and!.push({ seats: { $gt: 5 } });
      }
    }

    if (carType) {
      $match.$and!.push({ type: { $in: carType } });
    }

    if (gearbox) {
      $match.$and!.push({ gearbox: { $in: gearbox } });
    }

    if (mileage) {
      if (mileage.length === 1 && mileage[0] === bookcarsTypes.Mileage.Limited) {
        $match.$and!.push({ mileage: { $gt: -1 } });
      } else if (mileage.length === 1 && mileage[0] === bookcarsTypes.Mileage.Unlimited) {
        $match.$and!.push({ mileage: -1 });
      } else if (mileage.length === 0) {
        return res.json([{ resultData: [], pageInfo: [] }]);
      }
    }

    if (deposit && deposit > -1) {
      $match.$and!.push({ deposit: { $lte: deposit } });
    }

    if (Array.isArray(availability)) {
      if (availability.length === 1 && availability[0] === bookcarsTypes.Availablity.Available) {
        $match.$and!.push({ available: true });
      } else if (availability.length === 1 && availability[0] === bookcarsTypes.Availablity.Unavailable) {
        $match.$and!.push({ available: false });
      } else if (availability.length === 0) {
        return res.json([{ resultData: [], pageInfo: [] }]);
      }
    }

    const data = await Car.aggregate(
      [
        { $match },
        {
          $lookup: {
            from: "User",
            let: { userId: "$supplier" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$userId"] },
                },
              },
            ],
            as: "supplier",
          },
        },
        { $unwind: { path: "$supplier", preserveNullAndEmptyArrays: false } },
        {
          $group: {
            _id: "$supplier._id",
            fullName: { $first: "$supplier.fullName" },
            avatar: { $first: "$supplier.avatar" },
            carCount: { $sum: 1 },
          },
        },
        { $sort: { fullName: 1 } },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } }
    );

    return res.json(data);
  } catch (err) {
    logger.error(`[supplier.getBackendSuppliers] ${i18n.t("DB_ERROR")}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

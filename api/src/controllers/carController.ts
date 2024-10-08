import fs from "node:fs/promises";
import path from "node:path";
import { v1 as uuid } from "uuid";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";
import { Request, Response } from "express";
import CarSupplier from "../models/CarSupplier";
import * as bookcarsTypes from ":bookcars-types";
import Booking from "../models/Booking";
import Car from "../models/Car";
import i18n from "../lang/i18n";
import * as env from "../config/env.config";
import * as helper from "../common/helper";
import * as logger from "../common/logger";

/**
 * Create a Car.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const create = async (req: Request, res: Response) => {
  const { body }: { body: bookcarsTypes.CreateCarPayload } = req;

  try {
    if (!body.image) {
      logger.error(`[car.create] ${i18n.t("CAR_IMAGE_REQUIRED")} ${JSON.stringify(body)}`);
      return res.status(400).send(i18n.t("CAR_IMAGE_REQUIRED"));
    }

    const car = new Car(body);
    await car.save();

    const image = path.join(env.CDN_TEMP_CARS, body.image);

    if (await helper.exists(image)) {
      const filename = `${car._id}_${Date.now()}${path.extname(body.image)}`;
      const newPath = path.join(env.CDN_CARS, filename);

      await fs.rename(image, newPath);
      car.image = filename;
      await car.save();
    } else {
      await Car.deleteOne({ _id: car._id });
      logger.error(i18n.t("CAR_IMAGE_NOT_FOUND"), body);
      return res.status(400).send(i18n.t("CAR_IMAGE_NOT_FOUND"));
    }

    return res.json(car);
  } catch (err) {
    logger.error(`[car.create] ${i18n.t("DB_ERROR")} ${JSON.stringify(body)}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Validate car assign.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const validateAssign = async (req: Request, res: Response) => {
  const { body }: { body: bookcarsTypes.ValidateCarAssignPayload } = req;
  const { car, supplier, carSupplier } = body;

  try {
    const exists = await CarSupplier.exists({ supplier, car, status: { $ne: bookcarsTypes.CarStatus.Deleted }, _id: { $ne: carSupplier } });

    if (exists) {
      return res.sendStatus(204);
    }

    return res.sendStatus(200);
  } catch (err) {
    logger.error(`[car.validateAssign] ${i18n.t("DB_ERROR")} ${{ car, supplier }}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Assign a Car.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const assign = async (req: Request, res: Response) => {
  const { body }: { body: bookcarsTypes.AssignCarPayload } = req;

  try {
    if (await CarSupplier.exists({ supplier: body.supplier, car: body.car, status: { $ne: bookcarsTypes.CarStatus.Deleted } })) {
      logger.error(`[car.assign] ${i18n.t("CAR_ALREADY_ASSIGNED")} ${JSON.stringify(body)}`);
      return res.status(400).send(i18n.t("CAR_ALREADY_ASSIGNED"));
    }

    const carSupplier = new CarSupplier(body);
    await carSupplier.save();
    await carSupplier.save();
    return res.json(carSupplier);
  } catch (err) {
    logger.error(`[car.assign] ${i18n.t("DB_ERROR")} ${JSON.stringify(body)}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Update a Car.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const update = async (req: Request, res: Response) => {
  const { body }: { body: bookcarsTypes.UpdateCarPayload } = req;
  const { _id } = body;

  try {
    if (!helper.isValidObjectId(_id)) {
      throw new Error("body._id is not valid");
    }
    const car = await Car.findById(_id);

    if (car) {
      const {
        // suppliers,
        name,
        minimumAge,
        // available,
        type,
        // locations,
        // price,
        // deposit,
        seats,
        doors,
        aircon,
        gearbox,
        // fuelPolicy,
        // mileage,
        // cancellation,
        // // amendments,
        // gps,
        // theftProtection,
        // collisionDamageWaiver,
        // fullInsurance,
        // additionalDriver,
        // homeDelivery,
        // babyChair,
        // inventory,
      } = body;

      // car.supplier = new mongoose.Types.ObjectId(supplier);
      // eslint-disable-next-line arrow-body-style
      // car.suppliers = suppliers?.map((c) => {
      //   return { supplier: new mongoose.Types.ObjectId(c.supplier), inventory: c.inventory };
      // });
      car.minimumAge = minimumAge;
      // car.locations = locations.map((l) => new mongoose.Types.ObjectId(l));
      car.name = name;
      // car.available = available;
      car.type = type as bookcarsTypes.CarType;
      // car.price = price;
      // car.deposit = deposit;
      car.seats = seats;
      car.doors = doors;
      car.aircon = aircon;
      car.gearbox = gearbox as bookcarsTypes.GearboxType;
      // car.fuelPolicy = fuelPolicy as bookcarsTypes.FuelPolicy;
      // car.mileage = mileage;
      // car.cancellation = cancellation;
      // car.amendments = amendments;
      // car.gps = gps;
      // car.theftProtection = theftProtection;
      // car.collisionDamageWaiver = collisionDamageWaiver;
      // car.fullInsurance = fullInsurance;
      // car.additionalDriver = additionalDriver;
      // car.homeDelivery = homeDelivery;
      // car.babyChair = babyChair;
      // car.inventory = inventory;

      await car.save();
      return res.json(car);
    }

    logger.error("[car.update] Car not found:", _id);
    return res.sendStatus(204);
  } catch (err) {
    logger.error(`[car.update] ${i18n.t("DB_ERROR")} ${_id}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Update a Car Assign.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const updateAssign = async (req: Request, res: Response) => {
  const { body }: { body: bookcarsTypes.UpdateCarAssignPayload } = req;
  const { _id } = body;

  try {
    if (!helper.isValidObjectId(_id)) {
      throw new Error("body._id is not valid");
    }
    const carSupplier = await CarSupplier.findById(_id);

    if (carSupplier) {
      const {
        car,
        supplier,
        locations,
        price,
        deposit,
        available,
        fuelPolicy,
        mileage,
        cancellation,
        gps,
        homeDelivery,
        babyChair,
        theftProtection,
        collisionDamageWaiver,
        fullInsurance,
        additionalDriver,
        inventory,
        payLaterFee,
      } = body;

      carSupplier.car = new mongoose.Types.ObjectId(car);
      carSupplier.supplier = new mongoose.Types.ObjectId(supplier);
      carSupplier.locations = locations.map((l) => new mongoose.Types.ObjectId(l));
      carSupplier.available = available;
      carSupplier.price = price;
      carSupplier.deposit = deposit;
      carSupplier.fuelPolicy = fuelPolicy as bookcarsTypes.FuelPolicy;
      carSupplier.mileage = mileage;
      carSupplier.cancellation = cancellation;
      carSupplier.gps = gps;
      carSupplier.theftProtection = theftProtection;
      carSupplier.collisionDamageWaiver = collisionDamageWaiver;
      carSupplier.fullInsurance = fullInsurance;
      carSupplier.additionalDriver = additionalDriver;
      carSupplier.homeDelivery = homeDelivery;
      carSupplier.babyChair = babyChair;
      carSupplier.inventory = inventory;
      carSupplier.payLaterFee = payLaterFee;

      await carSupplier.save();
      return res.json(carSupplier);
    }

    logger.error("[carSupplier.update] CarSupplier not found:", _id);
    return res.sendStatus(204);
  } catch (err) {
    logger.error(`[carSupplier.update] ${i18n.t("DB_ERROR")} ${_id}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Check if a Car is related to bookings.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const _id = new mongoose.Types.ObjectId(id);
    const count = await Booking.find({ car: _id }).limit(1).countDocuments();

    if (count === 1) {
      return res.sendStatus(200);
    }

    return res.sendStatus(204);
  } catch (err) {
    logger.error(`[car.check] ${i18n.t("DB_ERROR")} ${id}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Delete a Car by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id);
    if (car) {
      await Car.deleteOne({ _id: id });

      if (car.image) {
        const image = path.join(env.CDN_CARS, car.image);
        if (await helper.exists(image)) {
          await fs.unlink(image);
        }
      }
      await Booking.deleteMany({ car: car._id });
    } else {
      return res.sendStatus(204);
    }
    return res.sendStatus(200);
  } catch (err) {
    logger.error(`[car.delete] ${i18n.t("DB_ERROR")} ${id}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Delete a CarSupplier by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteCarAssign = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const carSupplier = await CarSupplier.findById(id);
    if (carSupplier) {
      // await CarSupplier.deleteOne({ _id: id });
      carSupplier.status = bookcarsTypes.CarStatus.Deleted;
      await carSupplier.save();

      // await Booking.deleteMany({ car: car._id });
    } else {
      return res.sendStatus(204);
    }
    return res.sendStatus(200);
  } catch (err) {
    logger.error(`[car.delete] ${i18n.t("DB_ERROR")} ${id}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Upload a Car image to temp folder.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const createImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error("[car.createImage] req.file not found");
    }

    const filename = `${helper.getFilenameWithoutExtension(req.file.originalname)}_${uuid()}_${Date.now()}${path.extname(req.file.originalname)}`;
    const filepath = path.join(env.CDN_TEMP_CARS, filename);

    await fs.writeFile(filepath, req.file.buffer);
    return res.json(filename);
  } catch (err) {
    logger.error(`[car.createImage] ${i18n.t("DB_ERROR")}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Update a Car image.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const updateImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!req.file) {
      const msg = "[car.updateImage] req.file not found";
      logger.error(msg);
      return res.status(400).send(msg);
    }

    const { file } = req;

    const car = await Car.findById(id);

    if (car) {
      if (car.image) {
        const image = path.join(env.CDN_CARS, car.image);
        if (await helper.exists(image)) {
          await fs.unlink(image);
        }
      }

      const filename = `${car._id}_${Date.now()}${path.extname(file.originalname)}`;
      const filepath = path.join(env.CDN_CARS, filename);

      await fs.writeFile(filepath, file.buffer);
      car.image = filename;
      await car.save();
      return res.json(filename);
    }

    logger.error("[car.updateImage] Car not found:", id);
    return res.sendStatus(204);
  } catch (err) {
    logger.error(`[car.updateImage] ${i18n.t("DB_ERROR")} ${id}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Delete a Car image.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id);

    if (car) {
      if (car.image) {
        const image = path.join(env.CDN_CARS, car.image);
        if (await helper.exists(image)) {
          await fs.unlink(image);
        }
      }
      car.image = null;

      await car.save();
      return res.sendStatus(200);
    }
    logger.error("[car.deleteImage] Car not found:", id);
    return res.sendStatus(204);
  } catch (err) {
    logger.error(`[car.deleteImage] ${i18n.t("DB_ERROR")} ${id}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Delete a temp Car image.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {*}
 */
export const deleteTempImage = async (req: Request, res: Response) => {
  const { image } = req.params;

  try {
    const imageFile = path.join(env.CDN_TEMP_CARS, image);
    if (!(await helper.exists(imageFile))) {
      throw new Error(`[car.deleteTempImage] temp image ${imageFile} not found`);
    }

    await fs.unlink(imageFile);

    res.sendStatus(200);
  } catch (err) {
    logger.error(`[car.deleteTempImage] ${i18n.t("DB_ERROR")} ${image}`, err);
    res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Get a Car by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id)
      // .populate<{ supplier: env.UserInfo }>("supplier")
      // .populate<{ locations: env.LocationInfo[] }>({
      //   path: "locations",
      //   populate: {
      //     path: "values",
      //     model: "LocationValue",
      //   },
      // })
      .lean();

    if (car) {
      // const { _id, fullName, avatar, payLater } = car.supplier;
      // car.supplier = {
      //   _id,
      //   fullName,
      //   avatar,
      //   payLater,
      // };

      // for (const location of car.locations) {
      //   location.name = location.values.filter((value) => value.language === language)[0].value;
      // }

      return res.json(car);
    }
    logger.error("[car.getCar] Car not found:", id);
    return res.sendStatus(204);
  } catch (err) {
    logger.error(`[car.getCar] ${i18n.t("DB_ERROR")} ${id}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Get a Car by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getCarSupplier = async (req: Request, res: Response) => {
  const { id, language } = req.params;

  try {
    const carSupplier = await CarSupplier.findById(id)
      .populate<{ supplier: env.UserInfo }>("supplier")
      .populate<{ car: env.CarInfo }>("car")
      .populate<{ locations: env.LocationInfo[] }>({
        path: "locations",
        populate: {
          path: "values",
          model: "LocationValue",
        },
      })
      .lean();

    if (carSupplier) {
      const { _id, fullName, avatar, payLater } = carSupplier.supplier;
      carSupplier.supplier = {
        _id,
        fullName,
        avatar,
        payLater,
      };

      carSupplier.car = {
        _id: carSupplier.car._id,
        name: carSupplier.car.name,
        image: carSupplier.car.image,
        type: carSupplier.car.type,
        gearbox: carSupplier.car.gearbox,
        seats: carSupplier.car.seats,
        doors: carSupplier.car.doors,
        aircon: carSupplier.car.aircon,
        minimumAge: carSupplier.car.minimumAge,
      };

      for (const location of carSupplier.locations) {
        location.name = location.values.filter((value) => value.language === language)[0].value;
      }

      return res.json(carSupplier);
    }
    logger.error("[car.getCar] Car not found:", id);
    return res.sendStatus(204);
  } catch (err) {
    logger.error(`[car.getCar] ${i18n.t("DB_ERROR")} ${id}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Get Cars.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getCars = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.GetCarsPayload } = req;
    const page = Number.parseInt(req.params.page, 10);
    const size = Number.parseInt(req.params.size, 10);
    // const suppliers = body.suppliers!.map((id) => new mongoose.Types.ObjectId(id));
    const {
      carType,
      gearbox,
      // mileage, deposit, availability, fuelPolicy,
      carSpecs,
    } = body;
    const keyword = escapeStringRegexp(String(req.query.s || ""));
    const options = "i";

    const $match: mongoose.FilterQuery<any> = {
      $and: [
        { name: { $regex: keyword, $options: options } },
        // { supplier: { $in: suppliers } }
      ],
    };

    // if (fuelPolicy) {
    //   $match.$and!.push({ fuelPolicy: { $in: fuelPolicy } });
    // }

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

    // if (mileage) {
    //   if (mileage.length === 1 && mileage[0] === bookcarsTypes.Mileage.Limited) {
    //     $match.$and!.push({ mileage: { $gt: -1 } });
    //   } else if (mileage.length === 1 && mileage[0] === bookcarsTypes.Mileage.Unlimited) {
    //     $match.$and!.push({ mileage: -1 });
    //   } else if (mileage.length === 0) {
    //     return res.json([{ resultData: [], pageInfo: [] }]);
    //   }
    // }

    // if (deposit && deposit > -1) {
    //   $match.$and!.push({ deposit: { $lte: deposit } });
    // }

    // if (Array.isArray(availability)) {
    //   if (availability.length === 1 && availability[0] === bookcarsTypes.Availablity.Available) {
    //     $match.$and!.push({ available: true });
    //   } else if (availability.length === 1 && availability[0] === bookcarsTypes.Availablity.Unavailable) {
    //     $match.$and!.push({ available: false });
    //   } else if (availability.length === 0) {
    //     return res.json([{ resultData: [], pageInfo: [] }]);
    //   }
    // }

    const data = await Car.aggregate(
      [
        { $match },
        // {
        //   $lookup: {
        //     from: "User",
        //     let: { userId: "$supplier" },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: { $eq: ["$_id", "$$userId"] },
        //         },
        //       },
        //     ],
        //     as: "supplier",
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "CarSupplier",
        //     localField: "_id",
        //     foreignField: "car",
        //     as: "carSuppliers",
        //   },
        // },
        // { $unwind: { path: "$carSuppliers", preserveNullAndEmptyArrays: false } },
        // {
        //   $lookup: {
        //     from: "User",
        //     let: { userId: "$carSuppliers.supplier" },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: { $eq: ["$_id", "$$userId"] },
        //         },
        //       },
        //     ],
        //     as: "supplier",
        //   },
        // },
        // { $unwind: { path: "$supplier", preserveNullAndEmptyArrays: false } },
        // {
        //   $lookup: {
        //     from: 'Location',
        //     let: { locations: '$locations' },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: { $in: ['$_id', '$$locations'] },
        //         },
        //       },
        //     ],
        //     as: 'locations',
        //   },
        // },
        {
          $facet: {
            resultData: [{ $sort: { updatedAt: -1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
            // resultData: [{ $sort: { price: 1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
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

    // for (const car of data[0].resultData) {
    //   const { _id, fullName, avatar } = car.supplier;
    //   car.supplier = { _id, fullName, avatar };
    // }

    return res.json(data);
  } catch (err) {
    logger.error(`[car.getCars] ${i18n.t("DB_ERROR")} ${req.query.s}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get Cars.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getSupplierCars = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.GetCarsPayload } = req;
    const page = Number.parseInt(req.params.page, 10);
    const size = Number.parseInt(req.params.size, 10);
    const suppliers = body.suppliers!.map((id) => new mongoose.Types.ObjectId(id));
    const {
      carType,
      gearbox,
      // mileage, deposit, availability, fuelPolicy,
      carSpecs,
    } = body;
    const keyword = escapeStringRegexp(String(req.query.s || "optra"));
    const options = "i";

    const $match: mongoose.FilterQuery<any> = {
      $and: [
        { name: { $regex: keyword, $options: options } },
        {
          carSuppliers: {
            $elemMatch: { supplier: { $in: suppliers } }, // Filtrado dentro del arreglo `carSuppliers`
          },
        },
      ],
    };

    // if (fuelPolicy) {
    //   $match.$and!.push({ fuelPolicy: { $in: fuelPolicy } });
    // }

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

    // if (mileage) {
    //   if (mileage.length === 1 && mileage[0] === bookcarsTypes.Mileage.Limited) {
    //     $match.$and!.push({ mileage: { $gt: -1 } });
    //   } else if (mileage.length === 1 && mileage[0] === bookcarsTypes.Mileage.Unlimited) {
    //     $match.$and!.push({ mileage: -1 });
    //   } else if (mileage.length === 0) {
    //     return res.json([{ resultData: [], pageInfo: [] }]);
    //   }
    // }

    // if (deposit && deposit > -1) {
    //   $match.$and!.push({ deposit: { $lte: deposit } });
    // }

    // if (Array.isArray(availability)) {
    //   if (availability.length === 1 && availability[0] === bookcarsTypes.Availablity.Available) {
    //     $match.$and!.push({ available: true });
    //   } else if (availability.length === 1 && availability[0] === bookcarsTypes.Availablity.Unavailable) {
    //     $match.$and!.push({ available: false });
    //   } else if (availability.length === 0) {
    //     return res.json([{ resultData: [], pageInfo: [] }]);
    //   }
    // }

    const data = await CarSupplier.aggregate(
      [
        {
          $match: {
            supplier: { $in: suppliers }, // Filtrar por suppliers
            status: { $ne: bookcarsTypes.CarStatus.Deleted },
          },
        },
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
            minimumAge: "$carDetails.minimumAge",
          },
        },
        {
          $unset: "carDetails", // Eliminar el campo 'carDetails' del resultado final
        },
        // {
        //   $project: {
        //     _id: 1,
        //     supplier: 1,
        //     price: 1,
        //     deposit: 1,
        //     "carDetails.name": 1, // Proyectar campos de Car
        //     "carDetails.image": 1,
        //     "carDetails.someOtherField": 1, // Otros campos que necesites de Car
        //   },
        // },
        {
          $facet: {
            resultData: [{ $sort: { "carDetails.updatedAt": -1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
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
    console.log(suppliers);
    console.log(data[0].resultData[0]);
    // for (const car of data[0].resultData) {
    //   const { _id, fullName, avatar } = car.supplier;
    //   car.supplier = { _id, fullName, avatar };
    // }
    return res.json(data);
  } catch (err) {
    logger.error(`[car.getCars] ${i18n.t("DB_ERROR")} ${req.query.s}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get Model Cars.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getModelCars = async (req: Request, res: Response) => {
  try {
    const keyword = escapeStringRegexp(String(req.query.s || ""));
    const options = "i";
    const page = Number.parseInt(req.params.page, 10);
    const size = Number.parseInt(req.params.size, 10);

    const cars = await Car.aggregate(
      [
        {
          $match: {
            $and: [{ name: { $regex: keyword, $options: options } }],
          },
        },
        { $sort: { name: 1, _id: 1 } },
        { $skip: (page - 1) * size },
        { $limit: size },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } }
    );

    return res.json(cars);
  } catch (err) {
    logger.error(`[car.getBookingCars] ${i18n.t("DB_ERROR")} ${req.query.s}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get Cars by Supplier and pick-up Location.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getBookingCars = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.GetBookingCarsPayload } = req;
    const supplier = new mongoose.Types.ObjectId(body.supplier);
    const pickupLocation = new mongoose.Types.ObjectId(body.pickupLocation);
    const keyword = escapeStringRegexp(String(req.query.s || ""));
    const options = "i";
    const page = Number.parseInt(req.params.page, 10);
    const size = Number.parseInt(req.params.size, 10);
    const cars = await CarSupplier.aggregate(
      [
        {
          $match: {
            $and: [{ supplier: { $eq: supplier } }, { locations: pickupLocation }, { available: true }, { status: { $ne: bookcarsTypes.CarStatus.Deleted } }],
          },
        },
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
            minimumAge: "$carDetails.minimumAge",
          },
        },
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
          $match: {
            $and: [{ name: { $regex: keyword, $options: options } }],
          },
        },
        { $sort: { name: 1, _id: 1 } },
        { $skip: (page - 1) * size },
        { $limit: size },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } }
    );
    console.log(cars);
    return res.json(cars);
  } catch (err) {
    logger.error(`[car.getBookingCars] ${i18n.t("DB_ERROR")} ${req.query.s}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get Cars available for rental.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getFrontendCars = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.GetCarsPayload } = req;
    const page = Number.parseInt(req.params.page, 10);
    const size = Number.parseInt(req.params.size, 10);
    const suppliers = body.suppliers!.map((id) => new mongoose.Types.ObjectId(id));
    const pickupLocation = new mongoose.Types.ObjectId(body.pickupLocation);
    const { carType, gearbox, mileage, fuelPolicy, deposit, carSpecs, from, to } = body;

    const $match: mongoose.FilterQuery<any> = {
      $and: [{ supplier: { $in: suppliers } }, { locations: pickupLocation }, { available: true }, { status: { $ne: bookcarsTypes.CarStatus.Deleted } }],
    };

    const $match2: mongoose.FilterQuery<any> = {
      $and: [{ type: { $in: carType } }, { gearbox: { $in: gearbox } }],
    };

    if (fuelPolicy) {
      $match.$and!.push({ fuelPolicy: { $in: fuelPolicy } });
    }

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

    const fromDate = from ? new Date(from) : new Date();
    const toDate = to ? new Date(to) : new Date();

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
            as: "car", // Resultado del lookup
          },
        },
        { $unwind: "$car" }, // Desenrollar el array carDetails para acceder a los campos directamente
        {
          $addFields: {
            name: "$car.name",
            image: "$car.image",
            type: "$car.type",
            gearbox: "$car.gearbox",
            aircon: "$car.aircon",
            seats: "$car.seats",
            doors: "$car.doors",
            minimumAge: "$car.minimumAge",
          },
        },
        // {
        //   $unset: "carDetails", // Eliminar el campo 'carDetails' del resultado final
        // },
        { $match: $match2 },
        // {
        //   $lookup: {
        //     from: 'Location',
        //     let: { locations: '$locations' },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: { $in: ['$_id', '$$locations'] },
        //         },
        //       },
        //     ],
        //     as: 'locations',
        //   },
        // },
        {
          $lookup: {
            from: "Booking",
            localField: "_id",
            foreignField: "car",
            as: "bookings",
          },
        },
        {
          $addFields: {
            overlappingBookings: {
              $size: {
                $filter: {
                  input: "$bookings",
                  as: "booking",
                  cond: {
                    $and: [
                      { $lte: ["$$booking.from", toDate] },
                      { $gte: ["$$booking.to", fromDate] },
                      { $ne: ["$$booking.status", bookcarsTypes.BookingStatus.Void] },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $gt: ["$inventory", "$overlappingBookings"],
            },
          },
        },
        {
          $facet: {
            resultData: [{ $sort: { price: 1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
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

    for (const car of data[0].resultData) {
      const { _id, fullName, avatar } = car.supplier;
      car.supplier = { _id, fullName, avatar };
    }

    console.log(data[0].resultData);

    return res.json(data);
  } catch (err) {
    logger.error(`[car.getFrontendCars] ${i18n.t("DB_ERROR")} ${req.query.s}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

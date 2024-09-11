import express from "express";
import routeNames from "../config/walletRoutes.config";
import * as walletController from "../controllers/walletController";

const routes = express.Router();

routes.route(routeNames.getAddress).get(walletController.getAddress);
routes.route(routeNames.checkTronPayment).post(walletController.checkTronPayment);
routes.route(routeNames.checkEthPayment).post(walletController.checkEthPayment);
routes.route(routeNames.checkPayment).post(walletController.checkPayment);

export default routes;

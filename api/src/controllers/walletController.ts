import { Request, Response } from "express";
import TronWeb from "tronweb";
import Web3 from "web3";
import Booking from "src/models/Booking";
import Wallet from "src/models/Wallet";
import i18n from "../lang/i18n";
import * as logger from "../common/logger";
import * as env from "../config/env.config";
import * as bookcarsTypes from ":bookcars-types";

/**
 * Verifica una transacción en la red de TRON.
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkTronPayment = async (req: Request, res: Response) => {
  try {
    const { transactionId, amountToValidate } = req.body;

    const tronWeb = new TronWeb({
      fullHost: "https://api.trongrid.io", // Puedes usar 'https://api.shasta.trongrid.io' para la red de pruebas
      // headers: { "TRON-PRO-API-KEY": "732ad4c6-dc38-4b51-a1eb-bc85d15ca1d8" }, // Opcional, si tienes una API Key
    });

    const wallet = await Wallet.findOne({ network: "TRX" });
    const fixedAddress = wallet?.address;
    // Obtiene la información de la transacción por ID
    const transactionInfo = await tronWeb.trx.getTransactionInfo(transactionId);
    const transaction = await tronWeb.trx.getTransaction(transactionId);

    // Verifica si la transacción existe
    if (!transactionInfo || transactionInfo.receipt.result !== "SUCCESS") {
      logger.error(`[wallet.checkPayment] ${i18n.t("ERROR")}`, "Transaccion invalida");
      return res.status(400).send(`${i18n.t("ERROR")} Transaccion invalida`);
    }

    // Obtiene el monto de la transacción en SUN (1 USDT = 1,000,000 SUN)
    const contractData = transaction.raw_data.contract[0].parameter.value;
    const dataHex = contractData.data;
    const receiverHex = `41${dataHex.slice(32, 72)}`; // La dirección está en los bytes 8 a 48
    const receiverAddress = tronWeb.address.fromHex(receiverHex);
    console.log("🚀 ~ checkTronPayment ~ receiverAddress:", receiverAddress);

    // Decodifica el monto en SUN (1 USDT = 1,000,000 SUN)
    const amountHex = `0x${dataHex.slice(72, 136)}`; // El monto está en los bytes 48 a 136

    console.log("🚀 ~ checkTronPayment ~ amountHex:", amountHex);
    const amount = parseInt(amountHex, 16);
    console.log("🚀 ~ checkTronPayment ~ amount:", amount);
    // const amount = parseInt(contractData.amount || 0, 10);
    // const receiverAddress = tronWeb.address.fromHex(contractData.to_address);

    // Verifica el monto y la dirección del receptor
    if (amount !== amountToValidate * 1000000 || receiverAddress !== fixedAddress) {
      logger.error(`[wallet.checkPayment] ${i18n.t("ERROR")}`, "Transaccion invalida");
      return res.status(400).send(`${i18n.t("ERROR")} Transaccion invalida`);
    }

    return res.sendStatus(200);
  } catch (err) {
    logger.error(`[wallet.checkPayment] ${i18n.t("ERROR")}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Verifica una transacción en la red de ETH.
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkEthPayment = async (req: Request, res: Response) => {
  try {
    const { transactionId, amountToValidate } = req.body;

    const web3 = new Web3(`https://eth-mainnet.g.alchemy.com/v2/${env.ALCHEMY_APIKEY}`); // Reemplaza con tu URL de nodo

    const wallet = await Wallet.findOne({ network: "ETH" });
    const fixedAddress = wallet?.address;

    // Obtiene la transacción por hash
    const transaction = await web3.eth.getTransaction(transactionId);

    // Verifica si la transacción existe y es para el contrato correcto
    if (!transaction) {
      return res.status(400).send(`${i18n.t("ERROR")} Transaccion invalida`);
    }

    // Decodifica el input data de la transacción
    // const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    const decodedData = web3.eth.abi.decodeParameters(["address", "uint256"], transaction.input.slice(10));

    const receiverAddress = (decodedData[0] as string).toLowerCase();
    const amount = decodedData[1] as string;
    console.log(parseInt(amount, 10));
    // Verifica el monto y la dirección del receptor
    if (parseInt(amount, 10) !== parseInt(amountToValidate, 10) * 1_000_000 || receiverAddress !== fixedAddress?.toLowerCase()) {
      return res.status(400).send(`${i18n.t("ERROR")} Transaccion invalida`);
    }

    return res.sendStatus(200);
  } catch (err) {
    logger.error(`[wallet.checkPayment] ${i18n.t("ERROR")}`, err);
    return res.status(400).send(i18n.t("ERROR") + err);
  }
};

/**
 * Verifica una transacción existe en BD.
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkPayment = async (req: Request, res: Response) => {
  const { transactionId }: { transactionId: string } = req.body;

  try {
    const exists = await Booking.exists({ paymentIntentId: transactionId, status: { $ne: bookcarsTypes.BookingStatus.Deleted } });

    if (exists) {
      return res.sendStatus(400);
    }

    return res.sendStatus(200);
  } catch (err) {
    logger.error(`[wallet.checkPayment] ${i18n.t("DB_ERROR")} ${{ transactionId }}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

/**
 * Get a Address by network.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getAddress = async (req: Request, res: Response) => {
  const { network } = req.params;
  console.log("🚀 ~ getAddress ~ network:", network);

  try {
    const wallet = await Wallet.findOne({ network }).lean();

    if (wallet) {
      const l = { address: wallet.address };
      return res.json(l);
    }
    logger.error("[wallet.getAddress] Address not found:", network);
    return res.sendStatus(204);
  } catch (err) {
    logger.error(`[wallet.getAddress] ${i18n.t("DB_ERROR")} ${network}`, err);
    return res.status(400).send(i18n.t("DB_ERROR") + err);
  }
};

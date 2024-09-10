import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    TOTAL: "Total :",
    DELETE_BOOKING: "Êtes-vous sûr de vouloir supprimer cette réservation ?",
    CARD_PAYMENT: "Card payment",
    MOBILE_PAYMENT: "Mobile payment",
    WALLET_PAYMENT: "Crypto wallet payment",
    CASH: "Cash",
    POINT_OF_SELL: "Point of sell",
  },
  en: {
    TOTAL: "Total:",
    DELETE_BOOKING: "Are you sure you want to delete this booking?",
    CARD_PAYMENT: "Card payment",
    MOBILE_PAYMENT: "Mobile payment",
    WALLET_PAYMENT: "Crypto wallet payment",
    CASH: "Cash",
    POINT_OF_SELL: "Point of sell",
  },
  es: {
    TOTAL: "Total:",
    DELETE_BOOKING: "¿Está seguro de que quiere eliminar esta reserva?",
    CARD_PAYMENT: "Pago con tarjeta",
    MOBILE_PAYMENT: "Pago movil",
    WALLET_PAYMENT: "Pago con criptomoneda",
    CASH: "Efectivo",
    POINT_OF_SELL: "Punto de venta",
  },
});

langHelper.setLanguage(strings);
export { strings };

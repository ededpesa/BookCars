import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    TOTAL: "Total :",
    DELETE_BOOKING: "Êtes-vous sûr de vouloir supprimer cette réservation ?",
  },
  en: {
    TOTAL: "Total:",
    DELETE_BOOKING: "Are you sure you want to delete this booking?",
  },
  es: {
    TOTAL: "Total:",
    DELETE_BOOKING: "¿Está seguro de que quiere eliminar esta reserva?",
  },
});

langHelper.setLanguage(strings);
export { strings };

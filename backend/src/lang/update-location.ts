import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    UPDATE_LOCATION: "Modification du lieu",
    LOCATION_UPDATED: "Lieu modifié avec succès.",
  },
  en: {
    UPDATE_LOCATION: "Location update",
    LOCATION_UPDATED: "Location updated successfully.",
  },
  es: {
    UPDATE_LOCATION: "Actualización de ubicación",
    LOCATION_UPDATED: "Ubicación actualizada con éxito.",
  },
});

langHelper.setLanguage(strings);
export { strings };

import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    NEW_LOCATION_HEADING: "Nouveau lieu",
    LOCATION_NAME: "Lieu",
    INVALID_LOCATION: "Ce lieu existe déjà.",
    LOCATION_CREATED: "Lieu créé avec succès.",
  },
  en: {
    NEW_LOCATION_HEADING: "New location",
    LOCATION_NAME: "Location",
    INVALID_LOCATION: "This location already exists.",
    LOCATION_CREATED: "Location created successfully.",
  },
  es: {
    NEW_LOCATION_HEADING: "Nueva ubicación",
    LOCATION_NAME: "Ubicación",
    INVALID_LOCATION: "Esta ubicación ya existe.",
    LOCATION_CREATED: "Ubicación creada con éxito.",
  },
});

langHelper.setLanguage(strings);
export { strings };

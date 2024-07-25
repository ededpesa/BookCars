import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    NEW_LOCATION: "Nouveau lieu",
    DELETE_LOCATION: "Êtes-vous sûr de vouloir supprimer ce lieu ?",
    CANNOT_DELETE_LOCATION: "Ce lieu ne peut pas être supprimé car il est lié à des voitures.",
    EMPTY_LIST: "Pas de lieux.",
    LOCATION: "lieu",
    LOCATIONS: "lieux",
  },
  en: {
    NEW_LOCATION: "New location",
    DELETE_LOCATION: "Are you sure you want to delete this location?",
    CANNOT_DELETE_LOCATION: "This location cannot be deleted because it is related to cars.",
    EMPTY_LIST: "No locations.",
    LOCATION: "location",
    LOCATIONS: "locations",
  },
  es: {
    NEW_LOCATION: "Nueva ubicación",
    DELETE_LOCATION: "¿Está seguro de que quiere eliminar esta ubicación?",
    CANNOT_DELETE_LOCATION: "Esta ubicación no se puede eliminar porque está relacionada con vehículos.",
    EMPTY_LIST: "No hay ubicaciones.",
    LOCATION: "ubicación",
    LOCATIONS: "ubicaciones",
  },
});

langHelper.setLanguage(strings);
export { strings };

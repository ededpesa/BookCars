import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    PICK_UP_DATE: "Date de prise en charge",
    DROP_OFF_DATE: "Date de retour",
    DROP_OFF: "Restituer au même endroit",
    COVER: "Les meilleurs agences de location de voitures",
    SUPPLIERS_TITLE: "Vous Connecter aux plus Grandes Enseignes",
    MAP_TITLE: "Carte des Agences de Location de Voitures",
    MAP_PICK_UP_SELECTED: "Lieu de prise en charge sélectionné",
    MAP_DROP_OFF_SELECTED: "Lieu de restitution sélectionné",
    OUR_CARS: "Our cars",
  },
  en: {
    PICK_UP_DATE: "Pick-up Date",
    DROP_OFF_DATE: "Drop-off Date",
    DROP_OFF: "Return to same location",
    COVER: "Top Car Rental Companies",
    SUPPLIERS_TITLE: "Connecting you to the Biggest Brands",
    MAP_TITLE: "Map of Car Rental Locations",
    MAP_PICK_UP_SELECTED: "Pick-up Location selected",
    MAP_DROP_OFF_SELECTED: "Drop-off Location selected",
    OUR_CARS: "Our cars",
  },
  es: {
    PICK_UP_DATE: "Fecha de recogida",
    DROP_OFF_DATE: "Fecha de entrega",
    DROP_OFF: "Devolver en la misma ubicación",
    COVER: "Principales compañías de alquiler de vehículos",
    SUPPLIERS_TITLE: "Conectándote con las marcas más grandes",
    MAP_TITLE: "Nuestras Sedes",
    MAP_PICK_UP_SELECTED: "Ubicación de recogida seleccionada",
    MAP_DROP_OFF_SELECTED: "Ubicación de entrega seleccionada",
    OUR_CARS: "Nuestros vehículos",
  },
});

langHelper.setLanguage(strings);
export { strings };

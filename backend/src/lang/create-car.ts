import LocalizedStrings from "react-localization";
import env from "../config/env.config";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    NEW_CAR_HEADING: "Nouvelle voiture",
    NAME: "Nom",
    CAR_IMAGE_SIZE_ERROR: `L'image doit être au format ${env.CAR_IMAGE_WIDTH}x${env.CAR_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Taille d'image recommandée : ${env.CAR_IMAGE_WIDTH}x${env.CAR_IMAGE_HEIGHT}`,
    SUPPLIER: "Fournisseur",
    LOCATIONS: "Lieux de prise en charge",
    AVAILABLE: "Disponible à la location",
    CAR_TYPE: "Moteur",
    PRICE: "Prix",
    SEATS: "Sièges",
    DOORS: "Portes",
    GEARBOX: "Transmission",
    AIRCON: "Climatisation",
    MINIMUM_AGE: "Âge minimum",
    MINIMUM_AGE_NOT_VALID: `L'âge minimum doit être supérieur ou égal à ${env.MINIMUM_AGE} ans.`,
    INVENTORY: "Inventory",
  },
  en: {
    NEW_CAR_HEADING: "New car",
    NAME: "Name",
    CAR_IMAGE_SIZE_ERROR: `The image must be in the format ${env.CAR_IMAGE_WIDTH}x${env.CAR_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Recommended image size: ${env.CAR_IMAGE_WIDTH}x${env.CAR_IMAGE_HEIGHT}`,
    SUPPLIER: "Supplier",
    LOCATIONS: "Pickup locations",
    AVAILABLE: "Available for rental",
    CAR_TYPE: "Engine",
    PRICE: "Price",
    SEATS: "Seats",
    DOORS: "Doors",
    GEARBOX: "Gearbox",
    AIRCON: "Aircon",
    MINIMUM_AGE: "Minimum age",
    MINIMUM_AGE_NOT_VALID: `Minimum age must be greater than or equal to ${env.MINIMUM_AGE} years old.`,
    INVENTORY: "Inventory",
  },
  es: {
    NEW_CAR_HEADING: "Nuevo vehículo",
    NAME: "Nombre",
    CAR_IMAGE_SIZE_ERROR: `La imagen debe tener formato ${env.CAR_IMAGE_WIDTH}x${env.CAR_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Tamaño de imagen recomendado: ${env.CAR_IMAGE_WIDTH}x${env.CAR_IMAGE_HEIGHT}`,
    SUPPLIER: "Proveedor",
    LOCATIONS: "Ubicaciones de recogida",
    AVAILABLE: "Disponible para alquiler",
    CAR_TYPE: "Motor",
    PRICE: "Precio",
    SEATS: "Asientos",
    DOORS: "Puertas",
    GEARBOX: "Caja de cambios",
    AIRCON: "Aire acondicionado",
    MINIMUM_AGE: "Edad mínima",
    MINIMUM_AGE_NOT_VALID: `La edad mínima debe ser mayor o igual a ${env.MINIMUM_AGE} años.`,
    INVENTORY: "Inventario",
  },
});

langHelper.setLanguage(strings);
export { strings };

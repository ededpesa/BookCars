import LocalizedStrings from "react-localization";
import env from "../config/env.config";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    CREATE_SUPPLIER_HEADING: "Nouveau fournisseur",
    INVALID_SUPPLIER_NAME: "Ce fournisseur existe déjà.",
    SUPPLIER_IMAGE_SIZE_ERROR: `L'image doit être au format ${env.SUPPLIER_IMAGE_WIDTH}x${env.SUPPLIER_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Taille d'image recommandée : ${env.SUPPLIER_IMAGE_WIDTH}x${env.SUPPLIER_IMAGE_HEIGHT}`,
  },
  en: {
    CREATE_SUPPLIER_HEADING: "Nuevo proveedor",
    INVALID_SUPPLIER_NAME: "Este proveedor ya existe.",
    SUPPLIER_IMAGE_SIZE_ERROR: `La imagen debe tener formato ${env.SUPPLIER_IMAGE_WIDTH}x${env.SUPPLIER_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Tamaño de imagen recomendado: ${env.SUPPLIER_IMAGE_WIDTH}x${env.SUPPLIER_IMAGE_HEIGHT}`,
  },
  es: {
    CREATE_SUPPLIER_HEADING: "Nuevo proveedor",
    INVALID_SUPPLIER_NAME: "Este proveedor ya existe.",
    SUPPLIER_IMAGE_SIZE_ERROR: `La imagen debe tener formato ${env.SUPPLIER_IMAGE_WIDTH}x${env.SUPPLIER_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Tamaño de imagen recomendado: ${env.SUPPLIER_IMAGE_WIDTH}x${env.SUPPLIER_IMAGE_HEIGHT}`,
  },
});

langHelper.setLanguage(strings);
export { strings };

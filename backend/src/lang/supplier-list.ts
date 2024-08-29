import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    EMPTY_LIST: "Pas de fournisseurs.",
    VIEW_SUPPLIER: "Voir le profil de ce fournisseur",
    VIEW_INVENTORY: "View inventory",
    DELETE_SUPPLIER: "Êtes-vous sûr de vouloir supprimer ce fournisseur et toutes ses données ?",
  },
  en: {
    EMPTY_LIST: "No suppliers.",
    VIEW_SUPPLIER: "View supplier profile",
    VIEW_INVENTORY: "View inventory",
    DELETE_SUPPLIER: "Are you sure you want to delete this supplier and all its data?",
  },
  es: {
    EMPTY_LIST: "No hay proveedores.",
    VIEW_SUPPLIER: "Ver perfil del proveedor",
    VIEW_INVENTORY: "Ver inventario",
    DELETE_SUPPLIER: "¿Está seguro de que quiere eliminar este proveedor y todos sus datos?",
  },
});

langHelper.setLanguage(strings);
export { strings };

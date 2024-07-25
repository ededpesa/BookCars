import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    DELETE_USER: "Êtes-vous sûr de vouloir supprimer cet utilisateur et toutes ses données ?",
    DELETE_USERS: "Êtes-vous sûr de vouloir supprimer les utilisateurs sélectionnés et toutes leurs données ?",
    DELETE_SELECTION: "Supprimer les utilisateurs sélectionnés",
    BLACKLIST: "Ajouter à la liste noire",
  },
  en: {
    DELETE_USER: "Are you sure you want to delete this user and all his data?",
    DELETE_USERS: "Are you sure you want to delete the selected users and all their data?",
    DELETE_SELECTION: "Delete selectied users",
    BLACKLIST: "Add to the blacklist",
  },
  es: {
    DELETE_USER: "¿Está seguro de que quiere eliminar este usuario y todos sus datos?",
    DELETE_USERS: "¿Está seguro de que quiere eliminar a los usuarios seleccionados y todos sus datos?",
    DELETE_SELECTION: "Eliminar usuarios seleccionados",
    BLACKLIST: "Añadir a la lista negra",
  },
});

langHelper.setLanguage(strings);
export { strings };

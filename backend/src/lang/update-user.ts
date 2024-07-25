import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    UPDATE_USER_HEADING: "Modification de l'utilisateur",
  },
  en: {
    UPDATE_USER_HEADING: "User update",
  },
  es: {
    UPDATE_USER_HEADING: "Actualización de usuario",
  },
});

langHelper.setLanguage(strings);
export { strings };

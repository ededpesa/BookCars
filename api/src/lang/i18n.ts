import { I18n } from "i18n-js";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";

const i18n = new I18n({ en, es, fr });
i18n.enableFallback = true;
export default i18n;

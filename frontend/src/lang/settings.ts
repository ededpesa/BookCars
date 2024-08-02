import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    SETTINGS_UPDATED: "Paramètres modifiés avec succès.",
    NETWORK_SETTINGS: "Paramètres Réseau",
    NOTIFICATIONS_SETTINGS: "Paramètres de notification",
    SETTINGS_EMAIL_NOTIFICATIONS: "Activer les notifications par email",
  },
  en: {
    SETTINGS_UPDATED: "Settings updated successfully.",
    NETWORK_SETTINGS: "Network settings",
    NOTIFICATIONS_SETTINGS: "Notification settings",
    SETTINGS_EMAIL_NOTIFICATIONS: "Enable email notifications",
  },
  es: {
    SETTINGS_UPDATED: "Configuraciones actualizadas con éxito.",
    NETWORK_SETTINGS: "Configuraciones de red",
    NOTIFICATIONS_SETTINGS: "Configuraciones de notificación",
    SETTINGS_EMAIL_NOTIFICATIONS:
      "Habilitar notificaciones por correo electrónico",
  },
});

langHelper.setLanguage(strings);
export { strings };

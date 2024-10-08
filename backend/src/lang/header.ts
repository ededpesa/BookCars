import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    DASHBOARD: "Tableau de bord",
    HOME: "Accueil",
    COMPANIES: "Fournisseurs",
    LOCATIONS: "Lieux",
    CARS: "Voitures",
    USERS: "Utilisateurs",
    ABOUT: "À propos",
    TOS: "Conditions d'utilisation",
    CONTACT: "Contact",
    LANGUAGE: "Langue",
    SETTINGS: "Paramètres",
    SIGN_OUT: "Déconnexion",
  },
  en: {
    DASHBOARD: "Dashboard",
    HOME: "Home",
    COMPANIES: "Suppliers",
    LOCATIONS: "Locations",
    CARS: "Cars",
    USERS: "Users",
    ABOUT: "About",
    TOS: "Terms of Service",
    CONTACT: "Contact",
    LANGUAGE: "Language",
    SETTINGS: "Settings",
    SIGN_OUT: "Sign out",
  },
  es: {
    DASHBOARD: "Dashboard",
    HOME: "Inicio",
    COMPANIES: "Proveedores",
    LOCATIONS: "Ubicaciones",
    CARS: "Vehículos",
    USERS: "Usuarios",
    ABOUT: "Acerca de",
    TOS: "Términos de servicio",
    CONTACT: "Contacto",
    LANGUAGE: "Idioma",
    SETTINGS: "Configuración",
    SIGN_OUT: "Cerrar sesión",
  },
});

langHelper.setLanguage(strings);
export { strings };

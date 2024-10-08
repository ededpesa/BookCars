import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const COPYRIGHT_PART1 = `Copyright © ${new Date().getFullYear()} Upyrental`;

const strings = new LocalizedStrings({
  fr: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: ". Tous droits réservés.",

    CORPORATE: "À Propos",
    ABOUT: "À propos de Nous",
    TOS: "Conditions d'utilisation",
    RENT: "Louer une Voiture",
    SUPPLIERS: "Fournisseurs",
    LOCATIONS: "Lieux",
    SUPPORT: "Support",
    CONTACT: "Contact",
    SECURE_PAYMENT: "Paiement 100% sécurisé avec Upyrental",
  },
  en: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: ". All rights reserved.",

    CORPORATE: "Corporate",
    ABOUT: "About Us",
    TOS: "Terms of Service",
    RENT: "Rent a Car",
    SUPPLIERS: "Suppliers",
    LOCATIONS: "Locations",
    SUPPORT: "Support",
    CONTACT: "Contact",
    SECURE_PAYMENT: "100% secure payment with Upyrental",
  },
  es: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: ". Todos los derechos reservados.",

    CORPORATE: "Corporativo",
    ABOUT: "Acerca de nosotros",
    TOS: "Términos de servicio",
    RENT: "Alquilar un vehículo",
    SUPPLIERS: "Proveedores",
    LOCATIONS: "Ubicaciones",
    SUPPORT: "Soporte",
    CONTACT: "Contacto",
    SECURE_PAYMENT: "Pago 100% seguro con Upyrental",
  },
});

langHelper.setLanguage(strings);
export { strings };

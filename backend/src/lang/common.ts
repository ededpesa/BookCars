import LocalizedStrings from "react-localization";
import env from "../config/env.config";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    GENERIC_ERROR: "Une erreur non gérée s'est produite.",
    CHANGE_LANGUAGE_ERROR: "Une erreur s'est produite lors du changement de langue.",
    UPDATED: "Modifications effectuées avec succès.",
    GO_TO_HOME: "Aller à la page d'accueil",
    FULL_NAME: "Nom complet",
    EMAIL: "E-mail",
    PASSWORD: "Mot de passe",
    EMAIL_ALREADY_REGISTERED: "Cette adresse e-mail est déjà enregistrée.",
    CONFIRM_PASSWORD: "Confirmer le mot de passe",
    PHONE: "Téléphone",
    LOCATION: "Localisation",
    BIO: "Bio",
    IMAGE_REQUIRED: "Veuillez ajouter une image.",
    LOADING: "Chargement...",
    PLEASE_WAIT: "Veuillez patienter...",
    SEARCH: "Rechercher",
    SEARCH_PLACEHOLDER: "Rechercher...",
    CONFIRM_TITLE: "Confirmation",
    PASSWORD_ERROR: "Le mot de passe doit contenir au moins 6 caractères.",
    PASSWORDS_DONT_MATCH: "Les mots de passe ne correspondent pas.",
    CREATE: "Créer",
    UPDATE: "Modifier",
    DELETE: "Supprimer",
    SAVE: "Sauvegarder",
    CANCEL: "Annuler",
    RESET_PASSWORD: "Changer le mot de passe",
    CURRENCY: env.CURRENCY,
    DAILY: "/jour",
    DELETE_AVATAR_CONFIRM: "Êtes-vous sûr de vouloir supprimer la photo ?",
    DELETE_IMAGE: "Supprimer l'image",
    UPLOAD_IMAGE: "Charger une image",
    UNCHECK_ALL: "Décocher tout",
    CHECK_ALL: "Cocher tout",
    CLOSE: "Fermer",
    BOOKING_STATUS_VOID: "Vide",
    BOOKING_STATUS_PENDING: "En cours",
    BOOKING_STATUS_DEPOSIT: "Acompte",
    BOOKING_STATUS_PAID: "Payée",
    BOOKING_STATUS_RESERVED: "Réservée",
    BOOKING_STATUS_CANCELLED: "Annulée",
    FROM: "Début",
    TO: "Fin",
    OPTIONAL: "Paramètres optionnels",
    AND: "et",
    RECORD_TYPE_ADMIN: "Admin",
    RECORD_TYPE_SUPPLIER: "Fournisseur",
    RECORD_TYPE_USER: "Conducteur",
    TYPE: "Type",
    CONFIRM: "Confirmer",
    USER: "Utilisateur",
    INFO: "Information",
    USER_TYPE_REQUIRED: "Veuillez renseigner le champ : Type",
    FIX_ERRORS: "Veuillez corriger les erreurs.",
    SEND_MESSAGE: "Envoyer un message",
    VERIFIED: "Compte vérifié",
    CAR: "voiture",
    CARS: "voitures",
    RESEND_ACTIVATION_LINK: "Renvoyer le lien d'activation du compte",
    ACTIVATION_EMAIL_SENT: "E-mail d'activation envoyé.",
    EMAIL_NOT_VALID: "E-mail non valide",
    PHONE_NOT_VALID: "Numéro de téléphone non valide",
    BIRTH_DATE_NOT_VALID: `Le conducteur doit avoir au moins ${env.MINIMUM_AGE} ans.`,
    FORM_ERROR: "Veuillez corriger les erreurs.",
    ALL: "Tous",
    SUPPLIER: "Fournisseur",
    STATUS: "Statut",
    PICK_UP_LOCATION: "Lieu de prise en charge",
    DROP_OFF_LOCATION: "Lieu de restitution",
    OPTIONS: "Options",
    OF: "sur",
    BIRTH_DATE: "Date de naissance",
    BIRTH_DATE_NOT_VALID_PART1: "Le conducteur doit avoir au moins",
    BIRTH_DATE_NOT_VALID_PART2: "ans.",
    PAY_LATER: "Autoriser le paiement plus tard",
    ENTERPRISE_NAME: "Enterprise name",
    COMMERCIAL_ACTIVITY: "Commercial activity",
    WEB: "Web page",
    ENTERPRISE_EMAIL: "Enterprise email",
    ADDRESS: "Fiscal address",
    ENTERPRISE_DATA: "Enterprise data",
    CONTACT_DATA: "Contact data",
    DOCUMENT_TYPE: "Document type",
    DOCUMENT_NUMBER: "Document number",
    IDENTITY_CARD: "Identity card",
    PASSPORT: "Passport",
  },
  en: {
    GENERIC_ERROR: "An unhandled error occurred.",
    CHANGE_LANGUAGE_ERROR: "An error occurred while changing language.",
    UPDATED: "Changes made successfully.",
    GO_TO_HOME: "Go to the home page",
    FULL_NAME: "Full name",
    EMAIL: "Email",
    PASSWORD: "Password",
    EMAIL_ALREADY_REGISTERED: "This email address is already registered.",
    CONFIRM_PASSWORD: "Confirm Password",
    PHONE: "Phone",
    LOCATION: "Location",
    BIO: "Bio",
    IMAGE_REQUIRED: "Please add an image.",
    LOADING: "Loading...",
    PLEASE_WAIT: "Please wait...",
    SEARCH: "Search",
    SEARCH_PLACEHOLDER: "Search...",
    CONFIRM_TITLE: "Confirmation",
    PASSWORD_ERROR: "Password must be at least 6 characters long.",
    PASSWORDS_DONT_MATCH: "Passwords don't match.",
    CREATE: "Create",
    UPDATE: "Edit",
    DELETE: "Delete",
    SAVE: "Save",
    CANCEL: "Cancel",
    RESET_PASSWORD: "Change Password",
    CURRENCY: env.CURRENCY,
    DAILY: "/day",
    DELETE_AVATAR_CONFIRM: "Are you sure you want to delete the picture?",
    UPLOAD_IMAGE: "Upload image",
    DELETE_IMAGE: "Delete image",
    UNCHECK_ALL: "Uncheck all",
    CHECK_ALL: "Check all",
    CLOSE: "Close",
    BOOKING_STATUS_VOID: "Void",
    BOOKING_STATUS_PENDING: "Pending",
    BOOKING_STATUS_DEPOSIT: "Deposit",
    BOOKING_STATUS_PAID: "Paid",
    BOOKING_STATUS_RESERVED: "Reserved",
    BOOKING_STATUS_CANCELLED: "Cancelled",
    FROM: "From",
    TO: "To",
    OPTIONAL: "Optional Parameters",
    AND: "and",
    RECORD_TYPE_ADMIN: "Admin",
    RECORD_TYPE_SUPPLIER: "Supplier",
    RECORD_TYPE_ENTERPRISE: "Enterprise",
    RECORD_TYPE_USER: "Driver",
    TYPE: "Type",
    CONFIRM: "Confirm",
    USER: "User",
    INFO: "Information",
    USER_TYPE_REQUIRED: "Please fill in the field: Type",
    FIX_ERRORS: "Please fix errors.",
    SEND_MESSAGE: "Send a message",
    VERIFIED: "Verified account",
    CAR: "car",
    CARS: "cars",
    RESEND_ACTIVATION_LINK: "Resend account activation link",
    ACTIVATION_EMAIL_SENT: "Activation email sent.",
    EMAIL_NOT_VALID: "Invalid email address",
    PHONE_NOT_VALID: "Invalid phone number",
    BIRTH_DATE_NOT_VALID: `The driver must be at least ${env.MINIMUM_AGE} years old.`,
    FORM_ERROR: "Please fix errors.",
    ALL: "All",
    SUPPLIER: "Supplier",
    STATUS: "Status",
    PICK_UP_LOCATION: "Pickup location",
    DROP_OFF_LOCATION: "Drop-off location",
    OPTIONS: "Options",
    OF: "of",
    BIRTH_DATE: "Birthdate",
    BIRTH_DATE_NOT_VALID_PART1: "The driver must be at least",
    BIRTH_DATE_NOT_VALID_PART2: "years old.",
    PAY_LATER: "Authorize payment later",
    ENTERPRISE_NAME: "Enterprise name",
    COMMERCIAL_ACTIVITY: "Commercial activity",
    WEB: "Web page",
    ENTERPRISE_EMAIL: "Enterprise email",
    ADDRESS: "Fiscal address",
    ENTERPRISE_DATA: "Enterprise data",
    CONTACT_DATA: "Contact data",
    DOCUMENT_TYPE: "Document type",
    DOCUMENT_NUMBER: "Document number",
    IDENTITY_CARD: "Identity card",
    PASSPORT: "Passport",
  },
  es: {
    GENERIC_ERROR: "Se produjo un error no controlado.",
    CHANGE_LANGUAGE_ERROR: "Se produjo un error al cambiar el idioma.",
    UPDATED: "Cambios realizados con éxito.",
    GO_TO_HOME: "Ir a la página de inicio",
    FULL_NAME: "Nombre completo",
    EMAIL: "Correo electrónico",
    PASSWORD: "Contraseña",
    EMAIL_ALREADY_REGISTERED: "Esta dirección de correo electrónico ya está registrada.",
    CONFIRM_PASSWORD: "Confirmar contraseña",
    PHONE: "Teléfono",
    LOCATION: "Ubicación",
    BIO: "Biografía",
    IMAGE_REQUIRED: "Por favor, añade una imagen.",
    LOADING: "Cargando...",
    PLEASE_WAIT: "Por favor, espera...",
    SEARCH: "Buscar",
    SEARCH_PLACEHOLDER: "Buscar...",
    CONFIRM_TITLE: "Confirmación",
    PASSWORD_ERROR: "La contraseña debe tener al menos 6 caracteres.",
    PASSWORDS_DONT_MATCH: "Las contraseñas no coinciden.",
    CREATE: "Crear",
    UPDATE: "Editar",
    DELETE: "Eliminar",
    SAVE: "Guardar",
    CANCEL: "Cancelar",
    RESET_PASSWORD: "Cambiar contraseña",
    CURRENCY: env.CURRENCY,
    DAILY: "/día",
    DELETE_AVATAR_CONFIRM: "¿Está seguro de que quiere eliminar la imagen?",
    UPLOAD_IMAGE: "Subir imagen",
    DELETE_IMAGE: "Eliminar imagen",
    UNCHECK_ALL: "Deseleccionar todo",
    CHECK_ALL: "Seleccionar todo",
    CLOSE: "Cerrar",
    BOOKING_STATUS_VOID: "Anulado",
    BOOKING_STATUS_PENDING: "Pendiente",
    BOOKING_STATUS_DEPOSIT: "Depósito",
    BOOKING_STATUS_PAID: "Pagado",
    BOOKING_STATUS_RESERVED: "Reservado",
    BOOKING_STATUS_CANCELLED: "Cancelado",
    FROM: "Desde",
    TO: "Hasta",
    OPTIONAL: "Parámetros opcionales",
    AND: "y",
    RECORD_TYPE_ADMIN: "Administrador",
    RECORD_TYPE_SUPPLIER: "Proveedor",
    RECORD_TYPE_ENTERPRISE: "Empresa",
    RECORD_TYPE_USER: "Conductor",
    TYPE: "Tipo",
    CONFIRM: "Confirmar",
    USER: "Usuario",
    INFO: "Información",
    USER_TYPE_REQUIRED: "Por favor, rellene el campo: Tipo",
    FIX_ERRORS: "Por favor, corriga los errores.",
    SEND_MESSAGE: "Enviar mensaje",
    VERIFIED: "Cuenta verificada",
    CAR: "vehículo",
    CARS: "vehículos",
    RESEND_ACTIVATION_LINK: "Reenviar enlace de activación de cuenta",
    ACTIVATION_EMAIL_SENT: "Correo de activación enviado.",
    EMAIL_NOT_VALID: "Dirección de correo electrónico no válida",
    PHONE_NOT_VALID: "Número de teléfono no válido",
    BIRTH_DATE_NOT_VALID: `El conductor debe tener al menos ${env.MINIMUM_AGE} años.`,
    FORM_ERROR: "Por favor, corrige los errores.",
    ALL: "Todo",
    SUPPLIER: "Proveedor",
    STATUS: "Estado",
    PICK_UP_LOCATION: "Ubicación de recogida",
    DROP_OFF_LOCATION: "Ubicación de entrega",
    OPTIONS: "Opciones",
    OF: "de",
    BIRTH_DATE: "Fecha de nacimiento",
    BIRTH_DATE_NOT_VALID_PART1: "El conductor debe tener al menos",
    BIRTH_DATE_NOT_VALID_PART2: "años.",
    PAY_LATER: "Autorizar pago más tarde",
    ENTERPRISE_NAME: "Nombre de la empresa",
    COMMERCIAL_ACTIVITY: "Actividad comercial",
    WEB: "Página web",
    ENTERPRISE_EMAIL: "Correo de la empresa",
    ADDRESS: "Dirección fiscal",
    ENTERPRISE_DATA: "Datos de empresa",
    CONTACT_DATA: "Datos de contacto",
    DOCUMENT_TYPE: "Tipo de documento",
    DOCUMENT_NUMBER: "Número de documento",
    IDENTITY_CARD: "Cédula de identidad",
    PASSPORT: "Pasaporte",
  },
});

langHelper.setLanguage(strings);
export { strings };

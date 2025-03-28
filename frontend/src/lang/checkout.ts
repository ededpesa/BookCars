import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    BOOKING_HEADING: "Réserver Maintenant",
    BOOKING_OPTIONS: "Vos options de réservation",
    BOOKING_DETAILS: "Vos données de réservation",
    DAYS: "Jours",
    CAR: "Voiture",
    SUPPLIER: "Fournisseur",
    COST: "Total",
    DRIVER_DETAILS: "Informations du conducteur principal",
    EMAIL_INFO: "Vous recevrez une confirmation à cette adresse.",
    PHONE_INFO: "Si nous avons besoin de vous contacter d'urgence.",
    PAYMENT: "Paiement sécurisé",
    CARD_NUMBER: "Numéro de carte",
    CARD_NUMBER_NOT_VALID: "Numéro de carte non valide",
    CARD_EXPIRY_NOT_VALID: "Date d'expiration non valide",
    CVV_NOT_VALID: "Code de sécurité non valide",
    BOOK: "Réserver",
    SIGN_IN: "Se connecter ?",
    SECURE_PAYMENT_INFO: "Vos données sont protégées par le paiement sécurisé SSL.",
    SUCCESS: "Votre paiement a été effectué avec succès. Nous vous avons envoyé un e-mail de confirmation.",
    SUCCESS_SHORT: "Votre paiement a été effectué avec succès.",
    PAY_LATER_SUCCESS: "Votre réservation a été effectuée avec succès. Nous vous avons envoyé un e-mail de confirmation.",
    PAYMENT_OPTIONS: "Options de paiement",
    PAY_LATER: "Payer plus tard",
    PAY_LATER_INFO: "Modification et annulation gratuites",
    PAY_ONLINE: "Payer en ligne",
    PAY_ONLINE_INFO: "Modification et annulation sous conditions",
    CARD_PAYMENT: "Card payment",
    MOBILE_PAYMENT: "Mobile payment",
    WALLET_PAYMENT: "Crypto wallet payment",
    PAYMENT_FAILED: "Paiement échoué.",
    CHECKING: "Vérification en cours...",
    OBTATIN_WALLET_ADDRESS: "Scan the QR code shown to get the deposit address or you can copy it",
    HERE: "here",
    NETROWK: "Network",
    AMOUNT: "Amount",
    TX_ID_HELP: "Enter the transaction ID",
    COPIED_ADDRESS: "Address copied",
    COPIED_AMOUNT: "Amount copied",
    COPIED_PHONE: "Phone copied",
    COPIED_RIF: "RIF copied",
    COPIED_BANK: "Bank copied",
    MOBILE_PAYMENT_COPY_INFO: "Copy the following data to execute mobile payment:",
    MOBILE_PAYMENT_AFTER_PAYMENT: "After making the payment, enter the following information to confirm it:",
    BANK: "Bank",
    PAYERS_PHONE: "Payer's phone",
    REFERENCE_NUMBER: "Refence number",
    PAYMENT_DATE: "Payment date",
    WALLET_PAYMENT_ID_FAILED: "The transaction ID provided is invalid. Verify that the transaction is valid with the specified amount and try again",
    CAR_NOT_AVAILABLE: "The vehicle is no longer available",
    WALLET_PAYMENT_ALERADY_REGISTERED: "The transaction ID provided is already registered in the system.",
  },
  en: {
    BOOKING_HEADING: "Book now",
    BOOKING_OPTIONS: "Your booking options",
    BOOKING_DETAILS: "Your booking details",
    DAYS: "Days",
    CAR: "Car",
    SUPPLIER: "Supplier",
    COST: "COST",
    DRIVER_DETAILS: "Driver details",
    EMAIL_INFO: "You will receive a confirmation email at this address.",
    PHONE_INFO: "If we need to contact you urgently.",
    PAYMENT: "Secure payment",
    CARD_NUMBER: "Card Number",
    CARD_NUMBER_NOT_VALID: "Invalid card number",
    CARD_EXPIRY_NOT_VALID: "Invalid expiry date",
    CVV_NOT_VALID: "Invalid Card Validation Code",
    BOOK: "Book now",
    SIGN_IN: "Sign in?",
    SECURE_PAYMENT_INFO: "Your data is protected by SSL secure payment.",
    SUCCESS: "Your payment was successfully done. We sent you a confirmation email.",
    SUCCESS_SHORT: "Your payment was successfully done.",
    PAY_LATER_SUCCESS: "Your booking was successfully done. We sent you a confirmation email.",
    PAYMENT_OPTIONS: "Payment options",
    PAY_LATER: "Paye later",
    PAY_LATER_INFO: "Free amendments and cancellation",
    PAY_ONLINE: "Pay online",
    PAY_ONLINE_INFO: "Amendments and cancellation under conditions",
    CARD_PAYMENT: "Card payment",
    MOBILE_PAYMENT: "Mobile payment",
    WALLET_PAYMENT: "Crypto wallet payment",
    PAYMENT_FAILED: "Payment failed.",
    CHECKING: "Checking in progress...",
    OBTATIN_WALLET_ADDRESS: "Scan the QR code shown to get the deposit address or you can copy it",
    HERE: "here",
    NETROWK: "Network",
    AMOUNT: "Amount",
    TX_ID_HELP: "Enter the transaction ID",
    COPIED_ADDRESS: "Address copied",
    COPIED_AMOUNT: "Amount copied",
    COPIED_PHONE: "Phone copied",
    COPIED_RIF: "RIF copied",
    COPIED_BANK: "Bank copied",
    MOBILE_PAYMENT_COPY_INFO: "Copy the following data to execute mobile payment:",
    MOBILE_PAYMENT_AFTER_PAYMENT: "After making the payment, enter the following information to confirm it:",
    BANK: "Bank",
    PAYERS_PHONE: "Payer's phone",
    REFERENCE_NUMBER: "Refence number",
    PAYMENT_DATE: "Payment date",
    WALLET_PAYMENT_ID_FAILED: "The transaction ID provided is invalid. Verify that the transaction is valid with the specified amount and try again",
    CAR_NOT_AVAILABLE: "The vehicle is no longer available",
    WALLET_PAYMENT_ALERADY_REGISTERED: "The transaction ID provided is already registered in the system.",
  },
  es: {
    BOOKING_HEADING: "Reservar ahora",
    BOOKING_OPTIONS: "Sus opciones de reserva",
    BOOKING_DETAILS: "Los detalles de su reserva",
    DAYS: "Días",
    CAR: "Vehículo",
    SUPPLIER: "Proveedor",
    COST: "COSTO",
    DRIVER_DETAILS: "Detalles del conductor",
    EMAIL_INFO: "Recibirás un correo electrónico de confirmación en esta dirección.",
    PHONE_INFO: "Si necesitamos comunicarnos con usted urgentemente.",
    PAYMENT: "Pago seguro",
    CARD_NUMBER: "Número de tarjeta",
    CARD_NUMBER_NOT_VALID: "Numero de tarjeta invalido",
    CARD_EXPIRY_NOT_VALID: "Fecha de caducidad no válida",
    CVV_NOT_VALID: "Código de validación de tarjeta no válido",
    BOOK: "Reservar ahora",
    SIGN_IN: "¿Iniciar sesión?",
    SECURE_PAYMENT_INFO: "Tus datos están protegidos mediante pago seguro SSL.",
    SUCCESS: "Su pago se realizó exitosamente. Te hemos enviado un e-mail de confirmación.",
    SUCCESS_SHORT: "Su pago se realizó exitosamente.",
    PAY_LATER_SUCCESS: "Su reserva se realizó con éxito. Te hemos enviado un e-mail de confirmación.",
    PAYMENT_OPTIONS: "Opciones de pago",
    PAY_LATER: "Paga después",
    PAY_LATER_INFO: "Modificaciones y cancelaciones gratuitas",
    PAY_ONLINE: "Paga en linea",
    PAY_ONLINE_INFO: "Modificaciones y cancelación bajo condiciones",
    CARD_PAYMENT: "Pago con tarjeta",
    MOBILE_PAYMENT: "Pago movil",
    WALLET_PAYMENT: "Pago con criptomoneda (USDT)",
    PAYMENT_FAILED: "Pago fallido.",
    CHECKING: "Verificación en progreso...",
    OBTATIN_WALLET_ADDRESS: "Escanee el código QR mostrado para obtener la dirección de depósito o puede copiarla",
    HERE: "aquí",
    NETROWK: "Red",
    AMOUNT: "Monto",
    TX_ID_HELP: "Ingrese el ID de la transacción",
    COPIED_ADDRESS: "Dirección copiada",
    COPIED_AMOUNT: "Monto copiado",
    COPIED_PHONE: "Teléfono copiado",
    COPIED_RIF: "RIF copiado",
    COPIED_BANK: "Banco copiado",
    MOBILE_PAYMENT_COPY_INFO: "Copie los siguientes datos para ejecutar el pago móvil:",
    MOBILE_PAYMENT_AFTER_PAYMENT: "Luego de realizar el pago, ingresa la siguiente información para confirmarlo:",
    BANK: "Banco",
    PAYERS_PHONE: "Teléfono del pagador",
    REFERENCE_NUMBER: "Número de referencia",
    PAYMENT_DATE: "Fecha de pago",
    WALLET_PAYMENT_ID_FAILED:
      "El ID de transacción proporcionado es invalido. Verifique que la transaccion sea válida con el monto especificado e intente de nuevo",
    CAR_NOT_AVAILABLE: "El vehiculo ya no se encuentra disponible",
    WALLET_PAYMENT_ALERADY_REGISTERED: "El ID de transacción proporcionado ya está registrado en el sistema.",
  },
});

langHelper.setLanguage(strings);
export { strings };

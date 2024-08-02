import LocalizedStrings from "react-localization";
import * as langHelper from "../common/langHelper";

const strings = new LocalizedStrings({
  fr: {
    CAR: "Voiture",
    SUPPLIER: "Fournisseur",
    DRIVER: "Conducteur",
    PRICE: "Prix",
    STATUS: "Statut",
    UPDATE_SELECTION: "Modifier la sélection",
    DELETE_SELECTION: "Supprimer la sélection",
    UPDATE_STATUS: "Modification du statut",
    NEW_STATUS: "Nouveau statut",
    DELETE_BOOKING: "Êtes-vous sûr de vouloir supprimer cette réservation ?",
    DELETE_BOOKINGS:
      "Êtes-vous sûr de vouloir supprimer les réservations sélectionnées ?",
    EMPTY_LIST: "Pas de réservations.",
    VIEW: "Voir cette réservation",
    UPDATE: "Modifier cette réservation",
    DAYS: "Jours",
    COST: "Total",
    CANCEL: "Annuler cette réservation",
    CANCEL_BOOKING: "Êtes-vous sûr de vouloir annuler cette réservation ?",
    CANCEL_BOOKING_REQUEST_SENT:
      "Votre requête d'annulation a bien été prise en compte. Nous vous contacterons pour finaliser la procédure d'annulation.",
  },
  en: {
    CAR: "Car",
    SUPPLIER: "Supplier",
    DRIVER: "Driver",
    PRICE: "Price",
    STATUS: "Status",
    UPDATE_SELECTION: "Edit selection",
    DELETE_SELECTION: "Delete selection",
    UPDATE_STATUS: "Status modification",
    NEW_STATUS: "New status",
    DELETE_BOOKING: "Are you sure you want to delete this booking?",
    DELETE_BOOKINGS: "Are you sure you want to delete the selected bookings?",
    EMPTY_LIST: "No bookings.",
    VIEW: "View this booking",
    UPDATE: "Edit this booking",
    DAYS: "Days",
    COST: "COST",
    CANCEL: "Cancel this booking",
    CANCEL_BOOKING: "Are you sure you want to cancel this booking?",
    CANCEL_BOOKING_REQUEST_SENT:
      "Your cancel request has been submited. We will contact you to finalize the cancellation procedure.",
  },
  es: {
    CAR: "Vehículo",
    SUPPLIER: "Proveedor",
    DRIVER: "Conductor",
    PRICE: "Precio",
    STATUS: "Estado",
    UPDATE_SELECTION: "Editar selección",
    DELETE_SELECTION: "Eliminar selección",
    UPDATE_STATUS: "Modificación de estado",
    NEW_STATUS: "Nuevo estado",
    DELETE_BOOKING: "¿Está seguro de que quiere eliminar esta reserva?",
    DELETE_BOOKINGS:
      "¿Está seguro de que quiere eliminar las reservas seleccionadas?",
    EMPTY_LIST: "Sin reservas.",
    VIEW: "Ver esta reserva",
    UPDATE: "Editar esta reserva",
    DAYS: "Días",
    COST: "COSTO",
    CANCEL: "Cancelar esta reserva",
    CANCEL_BOOKING: "¿Está seguro de que desea cancelar esta reserva?",
    CANCEL_BOOKING_REQUEST_SENT:
      "Su solicitud de cancelación ha sido enviada. Nos pondremos en contacto contigo para finalizar el procedimiento de cancelación.",
  },
});

langHelper.setLanguage(strings);
export { strings };

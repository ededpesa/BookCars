const routes = {
  create: "/api/create-booking",
  checkout: "/api/checkout",
  update: "/api/update-booking",
  updateStatus: "/api/update-booking-status",
  delete: "/api/delete-bookings",
  deleteTempBooking: "/api/delete-temp-booking/:bookingId/:sessionId",
  getBooking: "/api/booking/:id/:language",
  getBookings: "/api/bookings/:page/:size/:language",
  insertPayment: "/api/insert-payment",
  deletePayment: "/api/booking-payment/:id",
  hasBookings: "/api/has-bookings/:driver",
  cancelBooking: "/api/cancel-booking/:id",
  checkAvailability: "/api/check-availability",
};

export default routes;

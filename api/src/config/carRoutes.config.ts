const routes = {
  create: "/api/create-car",
  validateAssign: "/api/validate-car-assign",
  assign: "/api/assign-car",
  update: "/api/update-car",
  updateAssign: "/api/update-car-assign",
  delete: "/api/delete-car/:id",
  createImage: "/api/create-car-image",
  updateImage: "/api/update-car-image/:id",
  deleteImage: "/api/delete-car-image/:id",
  deleteTempImage: "/api/delete-temp-car-image/:image",
  getCar: "/api/car/:id/:language",
  getCarSupplier: "/api/car-supplier/:id/:language",
  getCars: "/api/cars/:page/:size",
  getSupplierCars: "/api/supplier-cars/:page/:size",
  getModelCars: "/api/model-cars/:page/:size",
  getBookingCars: "/api/booking-cars/:page/:size",
  getFrontendCars: "/api/frontend-cars/:page/:size",
  checkCar: "/api/check-car/:id",
};

export default routes;

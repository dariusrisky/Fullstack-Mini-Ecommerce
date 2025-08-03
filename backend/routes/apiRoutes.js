const route = require("express").Router();
const {
  createCategrory,
  viewCategories,
  removeCategory,
} = require("../controller/categoryController");
const {
  authMiddlewareToko,
  authMiddlewareUser,
} = require("../controller/middleware/middleware");
const {
  createOrder,
  viewOrder,
  cancelOrder,
  buyOrder,
} = require("../controller/orderController");
const {
  createProduct,
  editProduct,
  viewProductperToko,
  removeProduct,
  getProduct,
  getOrderProduct,
  getProductbyID,
  getInfoToko,
  SearchProduk,
} = require("../controller/productController");
const {
  registerAccount,
  loginAccount,
  logoutAccount,
  getNewAccessToken,
  editProfileUser,
  getUser,
  editPassword,
} = require("../controller/userController");

route.post("/auth/register", registerAccount);
route.post("/auth/login", loginAccount);
route.post("/user/auth/logout", authMiddlewareUser, logoutAccount);

route.get("/user/get/profile", authMiddlewareUser, getUser);
route.put("/user/auth/profile/edit", authMiddlewareUser, editProfileUser);
route.put("/user/auth/edit/password", authMiddlewareUser, editPassword);
route.post("/user/auth/refresh-token", getNewAccessToken);

route.post("/user/product/create", authMiddlewareToko, createProduct);
route.put("/user/product/remove/:productId", authMiddlewareToko, removeProduct);
route.put("/user/product/update/:id", authMiddlewareToko, editProduct);
route.get("/user/history-order", authMiddlewareToko, getOrderProduct);

route.get("/products", getProduct);
route.get("/product/:id", getProductbyID);
route.get("/user/search", SearchProduk);
route.get("/toko/:id", getInfoToko);
route.get("/product/toko/:tokoid", viewProductperToko);

route.post("/user/order/product/item", authMiddlewareUser, createOrder);
route.get("/user/view/order", authMiddlewareUser, viewOrder);
route.put("/user/order/cancel-order/:orderId", authMiddlewareUser, cancelOrder);
route.put("/user/order/pay-order/:buyid", authMiddlewareUser, buyOrder);

route.post("/dev/create-category", authMiddlewareToko, createCategrory);
route.get("/view/categories", viewCategories);
route.delete("/dev/remove-category/:id", authMiddlewareToko, removeCategory);

module.exports = route;

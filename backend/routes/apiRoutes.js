const route = require("express").Router();
const {
  createCategrory,
  viewCategories,
  removeCategory,
} = require("../controller/categoryController");
const {
  authMiddlewareToko,
  authMiddlewareUser
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
} = require("../controller/productController");
const {
  registerAccount,
  loginAccount,
  logoutAccount,
  getNewAccessToken,
  editProfileUser,
} = require("../controller/userController");

route.post("/auth/register", registerAccount);
route.post("/auth/login", loginAccount);
route.post("/auth/logout", logoutAccount);

route.put("user/auth/profile/edit-profile", authMiddlewareUser, editProfileUser);
route.get("user/product/toko/:tokoid", authMiddlewareUser, viewProductperToko);
route.get("user/auth/refresh-token", getNewAccessToken);


route.post("user/product/create", authMiddlewareToko, createProduct);
route.put("user/product/remove/:productId", authMiddlewareToko, removeProduct);
route.put("user/product/update/:id", authMiddlewareToko, editProduct);
route.get('user/history-order', authMiddlewareToko, getOrderProduct);


route.get("/products", getProduct);

route.post("user/order/product/item", authMiddlewareUser, createOrder);
route.get("user/order/view-product", authMiddlewareUser, viewOrder);
route.put("user/order/cancel-order/:orderId", authMiddlewareUser, cancelOrder);
route.put("user/order/pay-order/:buyid", authMiddlewareUser, buyOrder);

route.post("dev/create-category",authMiddlewareToko ,createCategrory);
route.get("/view/categories",viewCategories);
route.delete("dev/remove-category/:id",authMiddlewareToko, removeCategory);

module.exports = route;

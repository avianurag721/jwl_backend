const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllproducts,
  getProductDetails,
} = require("../Controllers/Product");

router.post("/createProduct", createProduct);
router.get("/getAllProducts", getAllproducts);
router.post("/getProductDetails", getProductDetails);

module.exports = router;

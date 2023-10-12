const Product = require("../Models/Product");
const { uploadImageToCloudinary } = require("../Utils/imageUpload");
require("dotenv").config();

exports.createProduct = async (req, res) => {
  try {
    const { productName, productPrice, category } = req.body;

    if (!productName || !productPrice || !req.files) {
      return res.status(403).json({
        success: false,
        message: "please fill all the required fields",
      });
    }

    //  *************** image upload  ***************
    let productImageUrl = [];
    try {
      let keys = Object.values(req.files);
      for (let i = 0; i < keys.length; i++) {
        console.log("printing all the iterations", i);
        const ImageUrl = await uploadImageToCloudinary(
          keys[i],
          process.env.FOLDER_NAME
        );
        productImageUrl.push(ImageUrl);
      }
      console.log("productImage Urls........", productImageUrl);
    } catch (error) {
      console.log("error while uploading image", error.message);
    }

    // ************ create a product ******
    const newProduct = await Product.create({
      productName,
      productPrice,
      category,
      imgUrl: productImageUrl,
    });
    // console.log("new product is", newProduct);
    res.status(200).json({
      success: true,
      data: newProduct,
      message: "new Product Created Successfully",
    });
  } catch (error) {
    console.log("error while creating product", error.message);
  }
};

exports.getAllproducts = async (req, res) => {
  try {
    // console.log("into get all products");
    const allProducts = await Product.find({});
    return res.status(200).json({
      success: true,
      message: "all the Products fetched Successfully",
      data: allProducts,
    });
  } catch (error) {
    console.log("error while getting all the producrts", error.message);
  }
};

exports.getProductDetails = async (req, res) => {
  console.log("into details1")
  try {
    console.log("into details2")
    const { productId } = req.body;
    const fetchedProduct = await Product.findById(productId);
    if (!fetchedProduct) {
      return res.status(403).json({
        success: false,
        message: "Details of the product not available for given product id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product details Fetched successfully",
      productDetails:fetchedProduct
    })
  } catch (error) {
    console.log("error while geting product details", error.message);
    return res.status(403).json({
      success: false,
      message: "error while fetching details of the product",
    });
  }
};

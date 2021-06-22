var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var checkSessionAuth = require("../middlewares/checkSessionAuth");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  console.log(req.session.user);
  res.render("products/list", { title: "Products In DBMONGOGO", products });
});
router.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("products/add");
});
// store data in db
router.post("/add", async function (req, res, next) {
  let product = new Product(req.body);
  try{
    await product.save();
  }catch(err){
    console.log(err);
  }
  res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
  let product;
  try{
    product = await Product.findByIdAndDelete(req.params.id);
  }catch(err){
    console.log(err);
  }
  res.redirect("/products");
});
router.get("/cart/:id", async function (req, res, next) {
  let product ;
  try{
    product = await Product.findById(req.params.id);
    if(!product)
    {
      res.redirect("/products");
    }
  }catch(err){
    console.log(err);
  }
  console.log("Add This Product in cart");
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);
  res.redirect("/products");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
router.get("/edit/:id", async function (req, res, next) {
  let product;
  try{
    product =  await Product.findById(req.params.id);
  }catch(err){
    console.log(err);
  }
  res.render("products/edit", { product });
});
router.post("/edit/:id", async function (req, res, next) {
  let product;
  try{
    product =  await Product.findById(req.params.id);
  }catch(err){
    console.log(err);
  }
  product.name = req.body.name;
  product.price = req.body.price;
  try{
    await product.save();
  }catch(err){
    console.log(err);
  }
  res.redirect("/products");
});

router.get("/rating/:id", async function (req, res, next) {
  let product;
  try{
    product=await Product.findById(req.params.id);
    if(!product)
    {
      res.redirect("/products");
    }
  }catch(err){
    console.log(err);
  }
  res.render("rating", { product: product });
});

router.post("/rating/add/:id", async function (req, res, next) {
  console.log("REQ BODY: ", req.body.rate);
  let product;
  try{
  product= await Product.findById(req.params.id);
  product.name = product.name;
  product.description = product.description;
  product.price = product.price;
  product.rating = req.body.rate || 0;
  await product.save();
  }
  catch{
  console.log("REQ BODY: ", product);
  }
  res.redirect("/products");
});

module.exports = router;

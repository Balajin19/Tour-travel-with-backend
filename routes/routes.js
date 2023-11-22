const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const http = require("http");
const CustomerDetails = require("../model/customer");
router.get("/", (req, res) => {
  const customers = {
    message: "Welcome to TOUR-TRAVEL",
  };

  res.send(customers);
});
router.get("/allCustomers", async (req, res) => {
  const allCustomers = await CustomerDetails.find().populate();
  res.send(allCustomers);
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await CustomerDetails.findOne({ email });
    if (userExist) throw new Error("User already exist!");
    const addedData = new CustomerDetails({
      name,
      email,
      password,
    });
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: email,
    };

    const token = jwt.sign(data, jwtSecretKey);
    const addedCutomer = await addedData.save();
    const allCustomers = await CustomerDetails.find().populate();
    res.send(token);
  } catch (err) {
    next(err);
  }
});
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await CustomerDetails.findOne({ email });
    if (!userExist) throw new Error("User not found!");
    else {
      if (!(userExist.password === password)) {
        throw new Error("Incorrect password!");
      }
    }
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: email,
    };

    const token = jwt.sign(data, jwtSecretKey);
    res.send(token);
  } catch (err) {
    next(err);
  }
});
module.exports = router;

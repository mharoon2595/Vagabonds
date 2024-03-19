const express = require("express");
const { check } = require("express-validator");
const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../controller/user-controller");
const router = express.Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  registerUser
);
router.post("/login", loginUser);
router.use("/", getAllUsers);

module.exports = router;

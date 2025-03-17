// routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser, logoutUser, updateUser, getUsers, deleteUser, verifyToken, getProfile, getLoggedInUser, updateProfile, updatePassword } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/user/:id", updateUser);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.put("/profile/update", verifyToken, updateProfile);
router.put("/profile/update-password", verifyToken, updatePassword);
router.get("/profile", verifyToken, getProfile);

module.exports = router;

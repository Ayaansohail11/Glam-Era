const router = require("express").Router();
const {
  getProfile, updateProfile, changePassword, addAddress, deleteAddress, toggleWishlist, getWishlist,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/password", changePassword);
router.post("/addresses", addAddress);
router.delete("/addresses/:id", deleteAddress);
router.get("/wishlist", getWishlist);
router.post("/wishlist", toggleWishlist);

module.exports = router;

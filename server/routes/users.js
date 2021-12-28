const router = require("express").Router();
const userController = require("../controllers/userController.js");

// Create a new User
router.post("/", userController.createUser);

// Retrieve a single User with ID
router.get("/:id", userController.getUser);

// Update a user with ID
router.put("/:id", userController.updateUser);

module.exports = router;

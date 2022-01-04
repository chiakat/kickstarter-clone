const router = require("express").Router();
const projectController = require("../controllers/projectController.js");

// Create a new Project
router.post("/", projectController.createProject);

// Retrieve all Projects
router.get("/", projectController.getAllProjects);

// Retrieve a single Project with id
router.get("/:id", projectController.getProject);

// Update a Project with id
router.put("/:id", projectController.updateProject);

// Update a Project's Funding
router.patch("/:id/funding", projectController.updateProjectFunding);

// Delete a Project with id
router.delete("/:id", projectController.deleteProject);

module.exports = router;

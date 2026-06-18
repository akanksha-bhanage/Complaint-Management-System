const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/controllers");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

//Protect API's
router.post("/add", protect, authorizeRoles("user"), complaintController.createComplaint);
router.get("/pending", protect, authorizeRoles("admin"), complaintController.getPendingComplaints);
router.get("/resolved", protect, authorizeRoles("admin"), complaintController.getResolvedComplaints);
router.put("/assign/:id", protect, authorizeRoles("admin"), complaintController.assignComplaint);
router.get("/assigned", protect, authorizeRoles("staff"), complaintController.getAssignedComplaints);
router.put("/status/:id", protect, authorizeRoles("staff"), complaintController.updateStatus);
router.get("/my", protect, authorizeRoles("user"), complaintController.getMyComplaints);
router.get("/", protect, authorizeRoles("admin"), complaintController.getAllComplaints);

module.exports = router;
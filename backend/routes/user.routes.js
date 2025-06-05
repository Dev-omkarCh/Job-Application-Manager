import express from "express";
import { deleteApplication, editApplication, getApplications, submitApplication } from "../controllers/user.controllers.js";
import { protectedRoute } from "../middleware/protectedRoute.js";
const router = express.Router();

router.post("/application/add", protectedRoute, submitApplication);
router.post("/application/edit/:id", protectedRoute, editApplication);
router.delete("/application/delete/:id", protectedRoute, deleteApplication);
router.get("/applications", protectedRoute, getApplications);

export default router;
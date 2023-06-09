import express from "express";
const router = express.Router();

import { reviewController } from "../controllers/reviewController";

// users routes
router.route("/").get(reviewController);

export default router;

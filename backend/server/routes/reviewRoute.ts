import express from "express";
const router = express.Router();

import { reviewController } from "../controllers/reviewController";

router.route("/").post(reviewController);

export default router;

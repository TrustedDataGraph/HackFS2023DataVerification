import express from "express";
const router = express.Router();

import { testController } from "../controllers/testController";

// users routes
router.route("/").get(testController);

export default router;

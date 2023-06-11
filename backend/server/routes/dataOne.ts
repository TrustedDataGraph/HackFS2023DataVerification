import express from "express";
const router = express.Router();

import { getDataOne } from "../controllers/dataOne";

// users routes
router.route("/").get(getDataOne);

export default router;

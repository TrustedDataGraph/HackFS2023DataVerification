import express from "express";
import { getDataset, getOneDataset } from "../controllers/dataSetControllers";

const router = express.Router();

router.route("/").get(getDataset);
router.route("/:id").get(getOneDataset);

export default router;

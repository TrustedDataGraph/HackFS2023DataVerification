import express from "express";
import {
  getDataList,
  getOneDataList,
} from "../controllers/dataListControllers";

const router = express.Router();

router.route("/").get(getDataList);
router.route("/:id").get(getOneDataList);

export default router;

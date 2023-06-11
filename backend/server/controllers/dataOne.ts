import express from "express";
import { StatusCodes } from "http-status-codes";
import Data from "../models/data1Model";

// get users
export const getDataOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get users
    const dataOne = await Data.find({});

    res.status(StatusCodes.OK).json({
      dataOne,
    });
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

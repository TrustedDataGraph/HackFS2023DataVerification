import express from "express";
import { StatusCodes } from "http-status-codes";
import testmodel from "../models/testmodel";

// get users
export const testController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get users
    const tests = await testmodel.find({});

    res.status(StatusCodes.OK).json({
      tests,
    });
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

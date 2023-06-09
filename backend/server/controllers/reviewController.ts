import express from "express";
import { StatusCodes } from "http-status-codes";

// get users
export const reviewController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get cotntent

    // create buffer

    // post to web3 storage

    //return url
    const url = "http://hogehoge";

    res.status(StatusCodes.OK).json({
      url,
    });
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

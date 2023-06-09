import express from "express";
import { StatusCodes } from "http-status-codes";
import { makeFileObjects, storeFiles } from "../middleware/web3storage";

export const reviewController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get cotntent
    console.log(req.body);
    const {title,contents,user} = req.body;
    if(!title || !contents || !user){
      throw "request invalid";
    }

    // create buffer
    const files = makeFileObjects(req.body,"review.json");

    // post to web3 storage
    const url = await storeFiles(files);
    
    res.status(StatusCodes.OK).json({
      url,
    });
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

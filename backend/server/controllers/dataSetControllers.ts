import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DataSet from "../models/datasetModel";

// get dataset
export const getDataset = async (req: Request, res: Response) => {
  try {
    // get dataset
    const dataSet = await DataSet.find({});

    res.status(StatusCodes.OK).json({
      data: dataSet,
    });
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

//get a dataset
export const getOneDataset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //get data
    const dataSet = await DataSet.find({ _id: id });

    //if no error
    if (dataSet) {
      res.status(StatusCodes.OK).json({
        data: dataSet,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Dataset not found" });
    }
  } catch (error) {
    //throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

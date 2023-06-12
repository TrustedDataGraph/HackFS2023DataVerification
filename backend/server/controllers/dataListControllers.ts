import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DataList from "../models/dataListModel";

// get datalist
export const getDataList = async (req: Request, res: Response) => {
  try {
    // get datalist
    const dataList = await DataList.find({});

    res.status(StatusCodes.OK).json({
      data: dataList,
    });
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

//get a datalist
export const getOneDataList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //get data
    const dataList = await DataList.find({ _id: id });

    //if no error
    if (dataList) {
      res.status(StatusCodes.OK).json({
        data: dataList,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Datalist not found" });
    }
  } catch (error) {
    //throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

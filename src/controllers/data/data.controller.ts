import { Request, Response, NextFunction } from "express";
import IData from "../../models/data/data.interface";
import Data from "../../models/data/data.model";
import IUser from "../../models/user/user.interface";
import User from "../../models/user/user.model";

export const createUserData = async ( userId: Object ,next: NextFunction ) => {

  try {
    const data = await Data.create({
      user: userId,
    });
    console.log("dataCreated");
  } catch (err) {
    next(err);
  }
};

export const addTask = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  try{
    const { toDoListTask, TaskDescription } = req.body;
    const updated = await Data.findOneAndUpdate( { user: user.id }, { $push: { toDoList: { toDoListTask, TaskDescription } } } );
    return res.status(201).json({ message: "Task added successfully", updated });
  } catch (err) {
    next(err);
  }
}

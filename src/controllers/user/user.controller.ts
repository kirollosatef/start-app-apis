import { Request, Response, NextFunction } from "express";
import userService from "./user.service";
import User from "../../models/user/user.model";
import IUser from "../../models/user/user.interface";

// register user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone, email, password } = req.body;
    const ifEmailEx = User;
    const accessToken = await userService.register(
      name,
      phone,
      email,
      password
    );
    return res.json({ message: "User created successfully", accessToken });
  } catch (err) {
    next(err);
  }
};

// login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const accessToken = await userService.login(email, password);
    return res.json({ message: "User logged in successfully", accessToken });
  } catch (err) {
    next(err);
  }
};

// get user by id
export const getByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "successfully", user });
  } catch (err) {
    next(err);
  }
};

// update user
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const { name, phone, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, {
      name,
      phone,
      email,
      password,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};
// delete user
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
// get all users
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

// get user by some criteria or query
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone, email, password } = req.body;
    const user = await User.find({
      name,
      phone,
      email,
      password,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

// update role
export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, {
      role,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};

// update password
export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// email verification
export const emailVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// forgot password
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// reset password
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export default {
  register,
  login,
  getByID,
  update,
  remove,
  getAll,
  get,
  updateRole,
};

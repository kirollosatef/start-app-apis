import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import token from "../utils/token";
import User from "../models/user/user.model";
import IUser from "../models/user/user.interface";
import IToken from "../utils/interfaces/token.interface";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized", err: "No token provided" });
  }
  const accessToken = bearer.split(" ")[1].trim();
  try {
    const payload: IToken | jwt.JsonWebTokenError = await token.verifyToken(
      accessToken
    );
    if (payload instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized", err: payload });
    }
    const user = (await User.findById(payload.id)
      .select("-password")
      .exec()) as IUser;
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized", err: "User not found" });
    }
    req.user = user;
    console.log("hi");
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", err });
  }
};

export default authenticateToken;

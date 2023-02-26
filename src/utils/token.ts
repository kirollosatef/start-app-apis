import jwt from "jsonwebtoken";
import IUser from "../models/user/user.interface";
import IToken from "./interfaces/token.interface";

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;

export const createToken = (user: IUser): string => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | IToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as IToken);
    });
  });
};

export default { createToken, verifyToken };

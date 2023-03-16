import joi from "joi";
import { Request, Response, NextFunction } from "express";

const strongPass =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const signUpValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = joi.object({
    name: joi.string().min(4).max(15).required(),
    phone: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(strongPass).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(strongPass).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

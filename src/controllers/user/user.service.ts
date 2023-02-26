import User from "./../../models/user/user.model";
import token from "../../utils/token";
import IUser from "./../../models/user/user.interface";

export const register = async (
  name: string,
  phone: string,
  email: string,
  password: string
) => {
  const user = (await User.create({
    name,
    phone,
    email,
    password,
    role: "user",
  })) as IUser;
  const accessToken = token.createToken(user);
  return accessToken + " " + user;
};

export const login = async (
  email: string,
  password: string
): Promise<string | Error> => {
  try {
    const user = (await User.findOne({ email })) as IUser;
    if (!user) throw new Error("User not found");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Password is not correct");
    const accessToken = token.createToken(user);
    return accessToken;
  } catch (err) {
    throw err as Error;
  }
};

export default { register, login };

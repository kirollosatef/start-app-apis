import { Application } from "express";
import userRoutes from "./user/user.routes";

export function Routes(app: Application) {
  app.use("/user", userRoutes);
}

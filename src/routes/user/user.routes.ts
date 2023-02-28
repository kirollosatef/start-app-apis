import { Router } from "express";
import controller from "../../controllers/user/user.controller";
import auth from "../../middlewares/authenticated.middleware";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/all", controller.getAll);
router.get("/:id", auth, controller.getByID);

router.get("/", (req, res) => {
  res.send("User route");
});

export default router;

/* 
    normal user:
      1- register
      2- login
      3- get profile
      4- update profile
      5- delete profile
      6- update password
      7- forgot password
      8- verify email
      10- logout
*/

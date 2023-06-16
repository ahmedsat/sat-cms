import { Router } from "express";
import { register, login } from "../controllers/auth-controllers.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

// authRouter.get("/me", auth, me);
// authRouter.get("/", getAllUsers);
// authRouter.delete("/:id", deleteUser);

// module.exports = router;

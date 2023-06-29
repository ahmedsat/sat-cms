import { Router } from "express";
import { register, login, me } from "../controllers/auth-controllers.js";
import { authenticate } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

authRouter.get("/me", authenticate, me);
// authRouter.get("/", getAllUsers);
// authRouter.delete("/:id", deleteUser);

// module.exports = router;

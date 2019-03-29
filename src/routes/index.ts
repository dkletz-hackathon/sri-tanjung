import userRoute from "./user";
import {Router} from "express";

const router = Router();

router.use("/user", userRoute.router);

export default router;

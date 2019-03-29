import userRoute from "./user";
import placeRoute from './place';
import {Router} from "express";

const router = Router();

router.use("/user", userRoute.router);
router.use("/place", placeRoute.router);

export default router;

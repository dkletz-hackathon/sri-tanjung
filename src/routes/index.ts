import userRoute from "./user";
import placeRoute from "./place";
import productRoute from "./product";
import {Router} from "express";

const router = Router();

router.use("/user", userRoute.router);
router.use("/place", placeRoute.router);
router.use("/product", productRoute.router);

export default router;

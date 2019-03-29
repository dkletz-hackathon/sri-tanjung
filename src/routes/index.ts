import userRoute from "./user";
import placeRoute from "./place";
import productRoute from "./product";
import authRoute from "./auth";
import orderRoute from "./order";
import {Router} from "express";

const router = Router();

router.use("/auth", authRoute.router);
router.use("/user", userRoute.router);
router.use("/place", placeRoute.router);
router.use("/order", orderRoute.router);
router.use("/product", productRoute.router);

export default router;

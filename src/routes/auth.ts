import ApiRouter from "./ApiRouter";
import * as AuthController from "../controllers/AuthController";

const router = new ApiRouter();
router.post("/login", AuthController.login);

export default router;

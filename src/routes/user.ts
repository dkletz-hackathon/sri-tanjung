import ApiRouter from "./ApiRouter";
import * as UserController from "../controllers/UserController";

const router = new ApiRouter();

router.get("/profile", UserController.profile);
router.resource(UserController);
router.executeResource();

export default router;

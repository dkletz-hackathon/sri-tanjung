import ApiRouter from "./ApiRouter";
import * as UserController from "../controllers/UserController";
import auth from "../middleware/authentication";

const router = new ApiRouter();

router.get("/profile", auth, UserController.profile);
router.resource(UserController);
router.executeResource();

export default router;

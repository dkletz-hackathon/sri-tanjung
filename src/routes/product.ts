import ApiRouter from "./ApiRouter";
import * as ProductController from "../controllers/ProductController";

const router = new ApiRouter();

router.resource(ProductController);
router.executeResource();

export default router;

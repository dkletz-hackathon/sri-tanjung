import ApiRouter from "./ApiRouter";
import * as PlaceController from "../controllers/PlaceController";

const router = new ApiRouter();

router.resource(PlaceController);
router.get("/nearby", PlaceController.findPlaceNearby);
router.executeResource();

export default router;

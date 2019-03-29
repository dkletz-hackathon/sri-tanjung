import ApiRouter from "./ApiRouter";
import * as PlaceController from "../controllers/PlaceController";

const router = new ApiRouter();

router.get("/nearby", PlaceController.findPlaceNearby);
router.resource(PlaceController);
router.executeResource();

export default router;

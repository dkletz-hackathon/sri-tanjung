import DatabaseService from "../DatabaseService";
import {Request, Response} from "express";
import ApiError from "../ApiError";
import {Place} from "../models/Place";
import {Not} from "typeorm";

const placeRepository = DatabaseService.getConnection().getRepository(Place);

const checkIdModel = async (id: string | number) : Promise<Place> => {
  if (!id || id === "undefined") {
    throw new ApiError("error/parameter-error", 'ID not given');
  }
  const place = await placeRepository.findOne(id);
  if (!place) {
    throw new ApiError("error/not-found", "Model not found");
  }
  return place;
};

const index = async (req: Request, res: Response) => {
  const places = await placeRepository.find();
  return res.json(places);
};

const show = async (req: Request, res: Response) => {
  const {id} = req.params;
  if (!id || id === "undefined") {
    throw new ApiError("error/parameter-error", 'ID not given');
  }
  const place = await placeRepository.findOne(id, { relations: ["user", "products"]});
  return res.json(place);
};

const store = async (req: Request, res: Response) => {
  const {
    name, address, phone_num, image_url, description, geo_x, geo_y, category
  } = req.body;
  const place = await placeRepository.create({
    name, address, phone_num, image_url, description, geo_x, geo_y, category,
  });
  place.user = req.auth;
  await placeRepository.save(place);
  return res.status(201).json(place);
};

const update = async (req: Request, res: Response) => {
  const place = await checkIdModel(req.params.id);
  const {
    name, address, phone_num, image_url, description, geo_x, geo_y, category
  } = req.body;
  placeRepository.merge(place, {name, address, phone_num, image_url, description, geo_x, geo_y, category});
  await placeRepository.save(place);
  return res.json(place);
};

const destroy = async (req: Request, res: Response) => {
  const place = await checkIdModel(req.params.id);
  await placeRepository.delete(place);
  return res.json({
    message: "Delete success"
  });
};

const findPlaceNearby = async (req: Request, res: Response) => {
  const focusedPlace = await checkIdModel(req.query.id);
  let places = await placeRepository.find({ where: {
    id: Not(focusedPlace.id)}
  });
  places = places.filter((place) => {
    return Math.sqrt(Math.pow(focusedPlace.geo_x - place.geo_x, 2) + Math.pow(focusedPlace.geo_y - place.geo_y, 2)) < 10.0;
  });
  return res.json(places);
};

export {
  index, show, store, update, destroy, findPlaceNearby
}

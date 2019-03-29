import DatabaseService from "../DatabaseService";
import {Request, Response} from "express";
import ApiError from "../ApiError";
import {Place} from "../models/Place";

const placeRepository = DatabaseService.getConnection().getRepository(Place);

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
  return res.json();
};

const destroy = async (req: Request, res: Response) => {
  return res.json();
};

export {
  index, show, store, update, destroy
}

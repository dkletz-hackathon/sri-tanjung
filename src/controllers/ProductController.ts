import DatabaseService from "../DatabaseService";
import {Request, Response} from "express";
import ApiError from "../ApiError";
import {Product} from "../models/Product";
import {Place} from "../models/Place";

const productRepository = DatabaseService.getConnection().getRepository(Product);
const placeRepository = DatabaseService.getConnection().getRepository(Place);

const checkIdModel = async (id: string | number) : Promise<Product> => {
  if (!id || id === "undefined") {
    throw new ApiError("error/parameter-error", 'ID not given');
  }
  const product = await productRepository.findOne(id);
  if (!product) {
    throw new ApiError("error/not-found", "Product not found");
  }
  return product;
};

const index = async (req: Request, res: Response) => {
  const places = await productRepository.find();
  return res.json(places);
};

const show = async (req: Request, res: Response) => {
  const {id} = req.params;
  if (!id || id === "undefined") {
    throw new ApiError("error/parameter-error", 'ID not given');
  }
  const product = await productRepository.findOne(id, { relations: ["user", "products"]});
  return res.json(product);
};

const store = async (req: Request, res: Response) => {
  const {
    name, description, price, image_url, category, service_category, place_id
  } = req.body;
  const place = await placeRepository.findOne(place_id);
  if (!place) {
    throw new ApiError("error/not-found", "Place not found");
  }
  const product = await productRepository.create({
    name, description, price, image_url, category, place
  });
  if (service_category) {
    product.service_category = service_category;
  }
  await productRepository.save(product);
  return res.status(201).json(product);
};

const update = async (req: Request, res: Response) => {
  const {
    name, description, price, image_url, category, service_category, place_id
  } = req.body;
  const product = await checkIdModel(req.params.id);
  const place = await placeRepository.findOne(place_id);
  if (!place) {
    throw new ApiError("error/not-found", "Place not found");
  }
  productRepository.merge(product, { name, description, price, image_url, category, place });
  if (service_category) {
    product.service_category = service_category;
  }
  await productRepository.save(product);
  return res.json(product);
};

const destroy = async (req: Request, res: Response) => {
  const product = await checkIdModel(req.params.id);
  await productRepository.delete(product);
  return res.json({
    message: "Delete success"
  });
};

export {
  index, show, store, update, destroy
}

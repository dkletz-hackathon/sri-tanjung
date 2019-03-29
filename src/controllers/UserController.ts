import DatabaseService from "../DatabaseService";
import {Request, Response} from "express";
import {User} from "../models/User";
import ApiError from "../ApiError";

const userRepository = DatabaseService.getConnection().getRepository(User);

const index = async (req: Request, res: Response) => {
  const users = userRepository.find();
  return res.json(users);
};

const show = async (req: Request, res: Response) => {
  const {id} = req.params;
  if (!id || id === "undefined") {
    throw new ApiError("error/parameter-error", 'ID not given');
  }
  const user = await userRepository.findOne(id, { relations: ["cards", "schedules"]});
  return res.json(user);
};

const store = async (req: Request, res: Response) => {
  const {
    username, password, email, phone_num, image_url, user_type
  } = req.body;
  const user = await userRepository.create({
    username, password, email, phone_num, image_url, user_type
  });
  await userRepository.save(user);
  delete user.password;
  return res.status(201).json(user);
};

const update = async (req: Request, res: Response) => {
  const {id} = req.params;
  if (!id || id === undefined) {
    throw new ApiError("error/parameter-error", 'ID not given');
  }
  const user = await userRepository.findOne(id);
  const {
    username, password, email, phone_num, image_url, user_type
  } = req.body;
  userRepository.merge(user, { username, password, email, phone_num, image_url, user_type });
  await userRepository.save(user);
  return res.json(user);
};

const profile = async (req: Request, res: Response) => {
  return res.json(req.auth);
};

export {
  index, show, store, update, profile
}

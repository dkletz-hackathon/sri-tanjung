import {Request, Response} from "express";
import {User} from "../models/User";
import ApiError from "../ApiError";
import DatabaseService from "../DatabaseService";
import * as jwt from "jsonwebtoken";

const userRepository = DatabaseService.getConnection().getRepository(User);

const login = async (req: Request, res: Response) => {
  const {username, password} = req.body;
  const user = await userRepository.createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.username = :username", { username })
    .getOne();
  if (!user) {
    throw new ApiError("error/login-error", "Wrong username");
  }
  if (!user.check(password)) {
    throw new ApiError("error/login-error", "Wrong password");
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY,{algorithm: 'HS384'});
  return res.json({
    message: "login success",
    token: token
  });
};

export {
  login
};

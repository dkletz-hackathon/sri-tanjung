import * as jwt from 'jsonwebtoken';
import DatabaseService from '../DatabaseService';
import {User} from "../models/User";
import ApiError from "../ApiError";

const userRepository = DatabaseService.getConnection().getRepository(User);

const authentication = async (req, res, next) => {
  const header: string = req.headers["authorization"];
  if (!header) {
    throw new ApiError("error/auth", "No JWT found");
  }
  const splitHeader: string[] = header.split(" ");
  if (splitHeader.length !== 2)
    throw new ApiError("error/auth", "Format header is wrong");
  const token = splitHeader[1];
  const data: any = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (!data) {
    throw new ApiError("error/auth", "JWT not verified");
  }
  req.auth = await userRepository.findOne(data.id);
  next();
};

export default authentication;

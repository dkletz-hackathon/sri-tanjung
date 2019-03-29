import {User} from "./models/User";

declare global {
  namespace Express {
    export interface Request {
      props: any,
      auth: User
    }
    export interface Response {
      returnedBody: any
    }
  }
}

import {User} from "./user.model";

export interface UserCreate extends User {
  password: string;
}

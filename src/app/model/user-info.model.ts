import {User} from "./user.model";

export interface UserInfo extends User {
  token: string;
}

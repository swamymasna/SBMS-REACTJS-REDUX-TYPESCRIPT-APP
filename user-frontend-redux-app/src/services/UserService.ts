import axios from "axios";
import { IUser } from "../models/IUser";

const USER_API_BASE_URL = `http://localhost:8082/api/users`;

export class UserService {
  public static getAllUsers() :Promise<IUser[]|any>{
    return axios.get(USER_API_BASE_URL);
  }

  public static getUserById(userId: any):Promise<IUser|any> {
    return axios.get(`${USER_API_BASE_URL}/${userId}`);
  }

  public static registerUser(user: IUser):Promise<IUser|any> {
    return axios.post(USER_API_BASE_URL, user);
  }

  public static updateUser(userId: any, user: IUser):Promise<IUser|any> {
    return axios.put(`${USER_API_BASE_URL}/${userId}`, user);
  }

  public static removeUser(userId: any):Promise<any> {
    return axios.delete(`${USER_API_BASE_URL}/${userId}`);
  }
}

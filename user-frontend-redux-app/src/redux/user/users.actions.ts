import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services/UserService";
import { IUser } from "../../models/IUser";

export const getAllUsersAction:any = createAsyncThunk(
  "users/getAllUsersAction",
  async (payload: {}, { rejectWithValue }): Promise<IUser[] | any> => {
    try {
      const response = await UserService.getAllUsers();
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * get User By Id
 */
export const getUserByIdAction: any = createAsyncThunk(
  "users/getUserByIdAction",
  async (payload: { id: string }, { rejectWithValue }) => {
    try {
      const { id } = payload;
      const response = await UserService.getUserById(id);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * create new user
 */
export const registerUserAction: any = createAsyncThunk(
  "users/registerUserAction",
  async (payload: { user: IUser }, { rejectWithValue }) => {
    try {
      const { user } = payload;
      const response = await UserService.registerUser(user);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * update existing user
 */
export const updateUserAction: any = createAsyncThunk(
  "users/updateUserAction",
  async (payload: { id: any; user: IUser }, { rejectWithValue }) => {
    try {
      const { user, id } = payload;
      const response = await UserService.updateUser(id, user);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * delete existing user
 */
export const removeUserAction: any = createAsyncThunk(
  "users/removeUserAction",
  async (
    payload: { id: any },
    { rejectWithValue, dispatch }
  ): Promise<any> => {
    try {
      const { id } = payload;
      const response = await UserService.removeUser(id);

      if (response && response.data) {
        dispatch(getAllUsersAction());
      }

      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

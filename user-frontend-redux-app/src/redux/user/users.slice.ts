import {
  SerializedError,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import * as userActions from "./users.actions";
import { IUser } from "../../models/IUser";
import { ToastUtil } from "../../utils/ToastUtil";

export const userFeatureKey = "userFeature";

export interface InitialState {
  loading: boolean;
  error: SerializedError;
  users: IUser[];
  user: IUser;
}

const initialState: InitialState = {
  loading: false,
  error: {} as SerializedError,
  users: [] as IUser[],
  user: {} as IUser,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAllUsersAction
    builder
      .addCase(userActions.getAllUsersAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.getAllUsersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(userActions.getAllUsersAction.rejected, (state, action) => {
        state.loading = false;
        ToastUtil.displayErrorToast("Unable to Get Users from the Server");
        if (isRejectedWithValue(action)) {
          console.log(action.payload);
          state.error = action.error;
        }
      });
    //getUserByIdAction
    builder
      .addCase(userActions.getUserByIdAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.getUserByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userActions.getUserByIdAction.rejected, (state, action) => {
        state.loading = false;
        ToastUtil.displayErrorToast("Unable to Get Users from the Server");
        if (isRejectedWithValue(action)) {
          console.log(action.payload);
          state.error = action.error;
        }
      });

    //registerUserAction
    builder
      .addCase(userActions.registerUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        ToastUtil.displaySuccessToast("User Successfully Created");
      })
      .addCase(userActions.registerUserAction.rejected, (state, action) => {
        state.loading = false;
        ToastUtil.displayErrorToast("Failed to Create User");
        if (isRejectedWithValue(action)) {
          console.log(action.payload);
          state.error = action.error;
        }
      });

    //updateUserAction
    builder
      .addCase(userActions.updateUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.updateUserAction.fulfilled, (state, action) => {
        state.loading = false;
        ToastUtil.displaySuccessToast("User Successfully Updated");
      })
      .addCase(userActions.updateUserAction.rejected, (state, action) => {
        state.loading = false;
        ToastUtil.displayErrorToast("Failed to Update User");
        if (isRejectedWithValue(action)) {
          console.log(action.payload);
          state.error = action.error;
        }
      });

    //removeUserAction
    builder
      .addCase(userActions.removeUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.removeUserAction.fulfilled, (state, action) => {
        state.loading = false;
        ToastUtil.displaySuccessToast("User Successfully Deleted");
      })
      .addCase(userActions.removeUserAction.rejected, (state, action) => {
        state.loading = false;
        ToastUtil.displayErrorToast("Failed to Delete User");
        if (isRejectedWithValue(action)) {
          console.log(action.payload);
          state.error = action.error;
        }
      });
  },
});

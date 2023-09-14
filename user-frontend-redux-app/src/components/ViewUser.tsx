import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

import * as userActions from "../redux/user/users.actions";
import * as userReducer from "../redux/user/users.slice";

import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";

const ViewUser: React.FC = () => {
  let { id } = useParams();

  const dispatch: AppDispatch = useAppDispatch();

  /**
   * get the data from redux
   */
  const userState: userReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[userReducer.userFeatureKey];
    }
  );

  useEffect(() => {
    if (id) {
      dispatch(userActions.getUserByIdAction({ id: id }));
    }
  }, [id]);

  let { user, loading, error } = userState;

  return (
    <>
      {loading && <Spinner />}
      {user && Object.keys(user).length > 0 ? (
        <div className="container mt-3">
          {/* <h3>{JSON.stringify(user)}</h3> */}
          <div className="row">
            <div className="col">
              <div className="card col-md-6 offset-md-3 shadow-lg">
                <div className="card-header bg-success">
                  <h2 className="text-center text-white">User Details</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table tableData ms-5">
                    <tr>
                      <th>User-Id</th>
                      <td>{user.userId}</td>
                    </tr>

                    <tr>
                      <th>User-Name</th>
                      <td>{user.username}</td>
                    </tr>

                    <tr>
                      <th>Email-Id</th>
                      <td>{user.email}</td>
                    </tr>

                    <tr>
                      <th>DESIGNATION</th>
                      <td>{user.designation}</td>
                    </tr>

                    <tr>
                      <th>GENDER</th>
                      <td>{user.gender}</td>
                    </tr>

                    <tr>
                      <th>BIOGRAPHY</th>
                      <td>{user.bio}</td>
                    </tr>

                    <tr>
                      <th>TERMS</th>
                      <td>{user.terms ? "YES" : "NO"}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-center text-danger">User Not Found</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUser;

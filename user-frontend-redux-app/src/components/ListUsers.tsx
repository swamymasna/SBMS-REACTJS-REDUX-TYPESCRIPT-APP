import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

import * as userActions from "../redux/user/users.actions";
import * as userReducer from "../redux/user/users.slice";

import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";

const ListUsers: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  /**
   * get the data from redux
   */
  const userState: userReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[userReducer.userFeatureKey];
    }
  );

  let { users, loading, error } = userState;

  useEffect(() => {
    dispatch(userActions.getAllUsersAction());
  }, []);

  const deleteUser = (id: any): any => {
    if (id) {
      dispatch(userActions.removeUserAction({ id: id }));
    }
  };
  return (
    <>
      {loading && <Spinner />}
      {users.length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <div className="card shadow-lg ">
                <div className="card-header bg-primary">
                  <p className="h2 text-center text-white">Users List Data</p>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover tableData">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>USER-NAME</th>
                        <th>EMAIL-ID</th>
                        <th>DESIGNATION</th>
                        <th>GENDER</th>
                        {/* <th>BIOGRAPHY</th> */}
                        <th>TERMS</th>
                        <th className="text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => {
                        return (
                          <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.designation}</td>
                            <td>{user.gender}</td>
                            {/* <td>{user.bio}</td> */}
                            <td>{user.terms ? "YES" : "NO"}</td>
                            <td className="text-center">
                              <Link
                                to={`/edit-user/${user.userId}`}
                                className="btn btn-success"
                              >
                                Update
                              </Link>
                              <button
                                onClick={() => deleteUser(user.userId)}
                                className="btn btn-danger ms-2"
                              >
                                Delete
                              </button>
                              <Link
                                to={`/view-user/${user.userId}`}
                                className="btn btn-info ms-2"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
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
              <p className="h3 text-center text-danger">
                User Records Not Found
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListUsers;

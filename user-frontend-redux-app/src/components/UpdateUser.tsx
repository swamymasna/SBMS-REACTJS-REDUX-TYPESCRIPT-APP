import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import { useNavigate, useParams } from "react-router-dom";

import * as userActions from "../redux/user/users.actions";
import * as userReducer from "../redux/user/users.slice";

import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";

const UpdateUser: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  /**
   * get the data from redux
   */
  const userState: userReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[userReducer.userFeatureKey];
    }
  );

  let { loading, error, user: userRedux } = userState;

  let navigate = useNavigate();
  let { id } = useParams();

  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: "",
    designation: "",
    gender: "",
    bio: "",
    terms: false,
  });

  const onInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onInputTerms = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(userActions.getUserByIdAction({ id: id }));
    }
  }, [id]);

  //If change in the user redux, populate the data
  useEffect(() => {
    if (userRedux && Object.keys(userRedux).length > 0) {
      setUser({
        ...user,
        username: userRedux.username ? userRedux.username : "",
        email: userRedux.email ? userRedux.email : "",
        password: userRedux.password ? userRedux.password : "",
        designation: userRedux.designation ? userRedux.designation : "",
        gender: userRedux.gender ? userRedux.gender : "",
        bio: userRedux.bio ? userRedux.bio : "",
        terms: userRedux.terms ? userRedux.terms : false,
      });
    }
  }, [userRedux]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(userActions.updateUserAction({ id, user })).then(
      (response: any) => {
        if (!response.error) {
          navigate("/");
        }
      }
    );
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <div className="card col-md-4 offset-md-4 shadow-lg">
              <div className="card-header bg-warning">
                <p className="h2 text-center text-white">Edit Page</p>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      value={user.username}
                      onChange={onInputChange}
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      value={user.email}
                      onChange={onInputChange}
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      value={user.password}
                      onChange={onInputChange}
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <select
                      value={user.designation}
                      onChange={onInputChange}
                      name="designation"
                      className="form-control"
                    >
                      <option value="">Select Designation</option>
                      <option value="Software Engineer">
                        Software Engineer
                      </option>
                      <option value="Sr. Software Engineer">
                        Sr. Software Engineer
                      </option>
                      <option value="Tech Lead">Tech Lead</option>
                    </select>
                  </div>

                  <div className="mt-2">
                    <label className="ms-2">Gender</label>
                    <input
                      value={"Male"}
                      onChange={onInputChange}
                      name="gender"
                      type="radio"
                      className="ms-2"
                    />
                    <label>Male</label>

                    <input
                      value={"Female"}
                      onChange={onInputChange}
                      name="gender"
                      type="radio"
                      className="ms-2"
                    />
                    <label>Female</label>
                  </div>

                  <div className="mt-2">
                    <textarea
                      value={user.bio}
                      onChange={onInputChange}
                      name="bio"
                      className="form-control"
                      placeholder="Biography"
                      rows={3}
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      checked={user.terms}
                      onChange={onInputTerms}
                      name="terms"
                      type="checkbox"
                      className="ms-1 form-check-input"
                    />
                    <label className="ms-2">Accepts Terms & Conditions</label>
                  </div>

                  <div className="mt-2">
                    <input
                      type="submit"
                      value="Submit"
                      className="form-control btn btn-warning"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;

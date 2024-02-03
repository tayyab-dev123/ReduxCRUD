import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState();
  const { users, isLoading } = useSelector((state) => state.app);
  useEffect(() => {
    if (id && users) {
      const singleUser = users.filter((ele) => ele.id === id);
      setUpdateData(singleUser[0]);
    }
  }, [id, users]);

  console.log("Data", updateData);

  const newData = (e) => {
    const updatedData = { ...updateData, [e.target.name]: e.target.value };
    setUpdateData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };
  return (
    <div>
      <form className="w-50 mx-auto " onSubmit={handleSubmit}>
        <h2 className="text-center">Fill the data</h2>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={updateData && updateData.name}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={updateData && updateData.email}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            name="age"
            type="text"
            className="form-control"
            value={updateData && updateData.age}
            onChange={newData}
          />
        </div>
        <div className="text-center">
          <div className="d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Male"
                checked={updateData && updateData.gender === "Male"}
                onChange={newData}
              />
              <label className="form-check-label mx-2">Male</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Female"
                checked={updateData && updateData.gender === "Female"}
                onChange={newData}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;

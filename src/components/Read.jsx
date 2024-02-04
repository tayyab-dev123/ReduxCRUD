import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../features/userDetailSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { deleteUser } from "../features/userDetailSlice";
const Read = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState(null);
  const [radioData, setRadioData] = useState("");
  const { users, isloading, searchData } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (isloading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      {showPopup && <CustomModal setShowPopup={setShowPopup} id={id} />}
      <h1 className="text-center">All Data</h1>
      <div className="d-flex justify-content-center">
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            checked={radioData === ""}
            type="radio"
            onChange={(e) => setRadioData("")}
          />
          <label className="form-check-label mx-2">All</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            checked={radioData === "Male"}
            value="Male"
            type="radio"
            onChange={(e) => setRadioData(e.target.value)}
          />
          <label className="form-check-label mx-2">Male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="Female"
            checked={radioData === "Female"}
            onChange={(e) => setRadioData(e.target.value)}
          />
          <label className="form-check-label">Female</label>
        </div>
      </div>
      <div className="text-center">
        {users &&
          users
            .filter((item) => {
              if (searchData.length === 0) {
                return item;
              } else {
                return (
                  item.name.toLowerCase().includes(searchData.toLowerCase()) ||
                  item.email.toLowerCase().includes(searchData.toLowerCase()) ||
                  item.age.toString().includes(searchData)
                );
              }
            })
            .filter((ele) => {
              if (radioData === "Male") {
                return ele.gender === radioData;
              } else if (radioData === "Female") {
                return ele.gender === radioData;
              } else return ele;
            })
            .map((user) => (
              <div key={user.id} className="card w-50 mx-auto">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {user.email}
                  </h6>
                  <p className="card-text">
                    The gender of the user is <b>{user.gender}</b> and the age
                    is
                    <b> {user.age}</b>
                  </p>
                  <button
                    className="card-link"
                    onClick={() => [setId(user.id), setShowPopup(true)]}
                  >
                    View Card
                  </button>
                  <Link to={`/edit/${user.id}`} className="card-link">
                    Edit
                  </Link>
                  <Link
                    className="card-link"
                    onClick={() => dispatch(deleteUser(user.id))}
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Read;

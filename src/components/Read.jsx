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
  const { users, isloading } = useSelector((state) => state.app);
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
      <div className="text-center">
        {users &&
          users.map((user) => (
            <div key={user.id} className="card w-50 mx-auto">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="card-text">
                  The gender of the user is <b>{user.gender}</b> and the age is
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

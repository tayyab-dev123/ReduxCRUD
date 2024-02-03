import React from "react";
import { useSelector } from "react-redux";
import "./CustomModal.css";

const CustomModal = ({ id, setShowPopup }) => {
  const allusers = useSelector((state) => state.app.users);

  const singleUser = allusers.filter((ele) => ele.id === id);
  console.log("singleuser", singleUser);

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      onClick={() => setShowPopup(false)}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{singleUser[0].name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowPopup(false)}
            ></button>
          </div>
          <div className="modal-body">
            <h6>{singleUser[0].email}</h6>
            <h4>{singleUser[0].age}</h4>
            <p>{singleUser[0].gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

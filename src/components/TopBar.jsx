import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import "../assets/styles/TopBar.css";

const TopBar = ({
  chatname,
  setIsDeleteMode,
  setIsEditMode,
  isEditMode,
  isDeleteMode,
  selectedIdsLen,
  setIsLeftBarHidden
}) => {
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [isHoveredRedact, setIsHoveredRedact] = useState(false);

  const handleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);

    if (selectedIdsLen === 0) setIsDeleteMode(false);

    if (isEditMode) {
      setIsEditMode(!isEditMode);
    }
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);

    if (selectedIdsLen === 0) setIsEditMode(false);

    console.log(selectedIdsLen);

    console.log(isEditMode);

    if (isDeleteMode) {
      setIsDeleteMode(!isDeleteMode);
    }
  };

  const handleMouseEnterRedact = () => {
    setIsHoveredRedact(true);
  };

  const handleMouseLeaveRedact = () => {
    setIsHoveredRedact(false);
  };

  const handleMouseEnterDelete = () => {
    setIsHoveredDelete(true);
  };

  const handleMouseLeaveDelete = () => {
    setIsHoveredDelete(false);
  };

  return (
    
    <div className="top-bar">
      <div className="left-top-bar">
        {/* Кнопка ← Назад */}
        {window.innerWidth <= 800 && (
          <button
            className="back-button"
            onClick={() => setIsLeftBarHidden(false)}
          >
            ←
          </button>
        )}
        <h1>{chatname}</h1>
      </div>
      <div className="options-panel">
        {selectedIdsLen === 1 ? (
          <FaEdit
            style={{
              width: 30,
              height: 30,
              fill: isHoveredRedact ? "#00ff00" : "white",
              transition: "all 0.3s",
            }}
            onMouseEnter={handleMouseEnterRedact}
            onMouseLeave={handleMouseLeaveRedact}
            onClick={handleEditMode}
          />
        ) : (
          ""
        )}
        {selectedIdsLen > 0 ? (
          <GoTrash
            style={{
              width: 35,
              height: 35,
              fill: isHoveredDelete ? "red" : "white",
              transition: "all 0.3s",
              stroke: "black",
            }}
            onMouseEnter={handleMouseEnterDelete}
            onMouseLeave={handleMouseLeaveDelete}
            onClick={() => {
              handleDeleteMode();
              handleMouseLeaveDelete();
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TopBar;

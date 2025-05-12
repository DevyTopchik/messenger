import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import "../assets/styles/TopBar.css";

const TopBar = ({
  chatname,
  setIsDeleteMode,
  setIsEditMode,
  isEditMode,
  isDeleteMode,
  selectedMessagesIds,
}) => {
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [isHoveredRedact, setIsHoveredRedact] = useState(false);

  const handleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);

    if (selectedMessagesIds.length === 0) setIsDeleteMode(false);

    if (isEditMode) {
      setIsEditMode(!isEditMode);
    }
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);

    if (selectedMessagesIds.length === 0 || !selectedMessagesIds[0].isFrom)
      setIsEditMode(false);

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
      <MdKeyboardArrowLeft
        className="arrow-back"
        style={{ width: 35, height: "auto" }}
        onClick={() => {
          const left_bar = document.querySelector(".left-block");
          const right_part = document.querySelector(".main-part");

          left_bar.classList.toggle("not-active");
          right_part.classList.toggle("active");
        }}
      />
      <h1>{chatname}</h1>
      <div className="options-panel">
        {selectedMessagesIds.length === 1 && selectedMessagesIds[0]?.isFrom ? (
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
        {selectedMessagesIds.length > 0 ? (
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

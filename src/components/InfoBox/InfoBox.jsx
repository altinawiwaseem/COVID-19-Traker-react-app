import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, total }) {
  return (
    <div className="infoBox">
      <div className="infoBox_title box">{title}</div>
      <div className="infoBox_cases box">
        <h2>{cases}</h2>{" "}
      </div>
      <div className="infoBox_total box"> {total} Total </div>
    </div>
  );
}

export default InfoBox;

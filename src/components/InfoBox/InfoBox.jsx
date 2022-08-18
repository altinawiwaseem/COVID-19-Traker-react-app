import numeral from "numeral";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, theme, onClick }) {
  return (
    <div
      className={`infoBox ${theme} ${active && "selected"} `}
      onClick={onClick}
    >
      <div className="infoBox_cases box">
        <p className="infoBox_title box"> Today's {title}</p>
        <h2 className={title}>{numeral(cases).format(0, 0)}</h2>
      </div>

      <hr />

      <div className="infoBox_total box">
        <p>Total</p>
        <h3 className={title}> {numeral(total).format(0, 0)}</h3>{" "}
      </div>
    </div>
  );
}

export default InfoBox;

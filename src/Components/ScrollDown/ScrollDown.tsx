import React from "react";
import "./ScrollDown.scss";

export const ScrollDown = () => {
  return (
    <div className="scrolldown-wrapper">
      <div className="scrolldown">
        <svg height="30" width="10">
          <circle className="scrolldown-p1" cx="5" cy="15" r="2" />
          <circle className="scrolldown-p2" cx="5" cy="15" r="2" />
        </svg>
      </div>
    </div>
  );
};

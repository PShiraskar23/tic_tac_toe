import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loadingspinner mx-auto my-4 ">
      <div id="square1" className="square"></div>
      <div id="square2" className="square"></div>
      <div id="square3" className="square"></div>
      <div id="square4" className="square"></div>
      <div id="square5" className="square"></div>
    </div>
  );
};

export default LoadingSpinner;

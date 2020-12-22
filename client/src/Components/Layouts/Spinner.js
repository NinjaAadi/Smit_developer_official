import React from "react";
import spinner from '../../assets/spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{
          width: "200px",
          margin: "auto",
          marginTop:"200px",
          display: "block",
          backgroundColor : "whitesmoke"
        }}
        alt="Loading..."
      />
    </div>
  );
};

import React from "react";
import Animation from "./../../../assets/blocks_animations.svg";
import classes from "./Logo.module.css";

function Logo(props) {
  return (
    <object
      className={classes["svg"]}
      style={{ width: props.width + "vw", height: props.height + "vw" }}
      type="image/svg+xml"
      data={Animation}
    ></object>
  );
}
export default Logo;

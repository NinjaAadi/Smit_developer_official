import React from "react";
import classes from "./Card.module.css";

export default function Card(props) {
  console.log(props);
  return (
    <div className={classes["card"]}>
      <div className={classes["top"]}>
        <h1>{props.head}</h1>
      </div>
      <div className={classes["content"]}>
        <p>{props.des}</p>
      </div>
    </div>
  );
}

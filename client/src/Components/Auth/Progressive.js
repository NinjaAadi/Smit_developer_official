import React from 'react'
import classes from './Styles/progressive.module.css';
export default function Progressive(props) {
  const step = [];
  const done = [];
  for(let i=0;i<props.n;i++){
      step[i] = classes["done"];
      done[i] = classes["back"];
  }

    return (
      <div className={"container " + classes["cont"]}>
        <div className={classes["prg"]}>
          <div
            className={classes["step1"] + " " + step[0] + " " + done[0]}
          ></div>
          <div
            className={classes["step2"] + " " + step[1] + " " + done[1]}
          ></div>
          <div
            className={classes["step3"] + " " + step[2] + " " + done[2]}
          ></div>
          <div className={classes["step4"]}></div>
        </div>
      </div>
    );
}


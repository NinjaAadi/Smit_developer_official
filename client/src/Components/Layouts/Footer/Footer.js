import React, { Fragment } from "react";
import classes from "./footer.module.css";
import Logo from "./../Logo/Logo";
export default function Footer() {
  return (
    <Fragment>
      <div className={classes["footer"]}>
        <div className={classes["items"]}>
          <h2 className={classes["head"]}>
            SMIT DevBlock <Logo width="4" height="4" />
          </h2>
          <ul className={classes["list"]}>
            <li>API</li>
            <li>Bugs</li>
            <li>Contribute</li>
          </ul>
        </div>
        <div className={classes["items"]}>
          <h2 className={classes["head"]}>Developer</h2>
          <ul className={classes["list"]}>
            <li>
              <i class="fas fa-phone"></i> +91-7903966014
            </li>
            <li>
              <i class="fas fa-envelope-square"></i> aadityapal.info@gmail.com
            </li>
            <li>
              <i class="fas fa-blog"></i>
              <a
                className={classes["aa"]}
                href="https://aadityapal.netlify.app"
              >
                {" "}
                https://aadityapal.netlify.app/
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

// <ul className={classes["footer-list"]}>
//   <li>API</li>
//   <li>Bugs</li>
//   <li>Contribute</li>
//   <li>Contact Developer</li>
// </ul>;

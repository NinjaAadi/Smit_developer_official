import React, { Fragment } from "react";
import classes from "./footer.module.css";
export default function Footer() {
  return (
    <Fragment>
      <div className={classes["footer"]}>
        <div className={classes["wrap"]}>
          <div className={classes["box"]}>
            <p className={classes["heading"]}>About Us</p>
            <p className={classes["text"]}>
              Smit Developer is a blogging website where you can share your
              knowledge with the world about your tech skills.Get all updated
              informations about what is going on and around
            </p>
          </div>
          <div className={classes["box"]}>
            <p className={classes["heading"]}>Follow Us</p>
            <div className={classes["media-icons"]}>
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-youtube"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className={classes["box"]}>
            <p className={classes["heading"]}>Contact Us</p>
            <form className={classes["form"]}>
              <input
                className={classes["input"]}
                type="text"
                placeholder="Enter your email"
              ></input>
              <textarea
                className={classes["message"]}
                type="text"
                placeholder="Enter your message"
              ></textarea>
              <button className={classes["submit"]}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

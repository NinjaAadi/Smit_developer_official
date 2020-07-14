import React, { Fragment } from 'react'
import classes from './Home/home.module.css';
export default function Footer() {
    return (
      <Fragment>
        <div className={classes["main-landing-5"]}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className={classes["footer-1"]}>
                  <h2 className={classes["footer-h-1"]}>SMIT_DEVBLOCKS</h2>
                  <ul className={classes["footer-list"]}>
                    <li>API</li>
                    <li>Bugs</li>
                    <li>Contribute</li>
                    <li>Contact Developer</li>
                  </ul>
                </div>
              </div>
              <div className={"col-lg-6 d-flex" + " " + classes["all"]}>
                <div className={classes["last-image"]}></div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
}

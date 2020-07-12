import React,{Fragment} from 'react';
import {Link,Redirect,withRouter} from 'react-router-dom';
import classes from './home.module.css';


const Home = (props) => {

    return (
      <Fragment>
        <div className={classes["main-landing-1"]}>
          <div className="container-fluid">
            <div className="row">
              <div className={"col-lg-6 d-flex" + " " + classes["all"]}>
                <div className={classes["landing-text-1"]}>
                  <p className={classes["para-1"]}>Interested</p>
                  <p className={classes["para-2"]}>in the</p>
                  <p className={classes["para-3"]}>Coding Community</p>
                  <p className={classes["para-4"]}>
                    You are at the right place
                  </p>
                </div>
              </div>
              <div className={"col-lg-6 d-flex" + " " + classes["all"]}>
                <div className={classes["image-1"]}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes["main-landing-2"]}>
          <div className="container-fluid">
            <div className="row">
              <div className={classes["col-div-2"] + " " + "col-lg-4 d-flex"}>
                <div className={classes["img-2"]}></div>
              </div>
              <div className={classes["col-div-2"] + " " + "col-lg-4"}>
                <div className={classes["btn-div"]}>
                  <Link to="/login">
                    <button className={classes["btn-1"]}>Login</button>
                  </Link>
                  <Link to="/signup">
                    <button className={classes["btn-2"]}>Signup</button>
                  </Link>
                </div>
              </div>
              <div
                className={
                  classes["col-div-2"] +
                  " " +
                  "col-lg-4 d-flex" +
                  " " +
                  classes["all"]
                }
              >
                <div className={classes["img-3"]}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes["main-landing-3"]}>
          <div className="container-fluid">
            <div className="row">
              <div className={"col-lg-4 d-flex" + " " + classes["all"]}>
                <div className={classes["card-1"]}>
                  <h2>Best community</h2>
                  <br />
                  <p>
                    G’day, we’re Atlassian. We make tools like Jira and Trello
                    that are used by thousands of teams worldwide. And we’re
                    serious about creating amazing products, practices, and open
                    work for all teams.
                  </p>
                </div>
              </div>
              <div className={"col-lg-4 d-flex" + " " + classes["all"]}>
                <div className={classes["card-2"]}>
                  <h2>Ask your queries</h2>
                  <br />
                  <p>
                    G’day, we’re Atlassian. We make tools like Jira and Trello
                    that are used by thousands of teams worldwide. And we’re
                    serious about creating amazing products, practices, and open
                    work for all teams.
                  </p>
                </div>
              </div>
              <div className={"col-lg-4 d-flex" + " " + classes["all"]}>
                <div className={classes["card-3"]}>
                  <h2>Help other people</h2>
                  <br />
                  <p>
                    G’day, we’re Atlassian. We make tools like Jira and Trello
                    that are used by thousands of teams worldwide. And we’re
                    serious about creating amazing products, practices, and open
                    work for all teams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["mid"]}></div>

        <div className={classes["main-landing-4"]}>
          <div className="container-fluid">
            <div className="row">
              <div className={"col-lg-6 d-flex" + " " + classes["all"]}>
                <div className={classes["img-4"]}></div>
              </div>
              <div className={"col-lg-6 d-flex" + " " + classes["all"]}>
                <div>
                  <div className={classes["textbox"]}>
                    <h2 className={classes["head"]}>Know the</h2>
                    <h1 className={classes["head-2"]}>Community</h1>
                  </div>

                  <div className={classes["grid"]}>
                    <div className={classes["grid-item"]}>
                      <p>Heavy Light Decomposition</p>
                    </div>
                    <div className={classes["grid-item"]}>
                      <p>Web dev</p>
                    </div>
                    <div className={classes["grid-item"]}>
                      <p>Android</p>
                    </div>
                    <div className={classes["grid-item"]}>
                      <p>Machine Learning</p>
                    </div>
                    <div className={classes["grid-item"]}>
                      <p>Competitive Programming</p>
                    </div>
                    <div className={classes["grid-item"]}>
                      <p>Security</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["smit-div"] + " " + "container"}>
          <h3> Sikkim Manipal Institute of technology</h3>
          <p>
            Sikkim Manipal Institute of Technology, [SMIT] East Sikkim is a part
            of the prestigious Sikkim Manipal University which came into
            existence in 1995. The Institute was founded in 1997. The Institute
            is approved by AICTE and UGC. It is accreditated by the NBA and
            holds accreditation by ISO 9001:2008. The Institute is one of the
            top ranking institutes in the country.
          </p>
        </div>
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

export default withRouter(Home);

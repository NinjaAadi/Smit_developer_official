import React, { Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import classes from "./home.module.css";
import img1 from "../../../assets/landing.svg";
import side1 from "../../../assets/side1.svg";
import side2 from "../../../assets/side2.svg";
import mid from "../../../assets/mid.svg";
import comm from "../../../assets/comm.svg";

const Home = (props) => {
  return (
    <Fragment>
      <div className={classes["main-land-1"]}>
        <div className={classes["head"]}>
          <div className={classes["text"]}>
            <h1>
              Interested in Programming <i class="fas fa-laptop"></i>
            </h1>
            <h2>You are at the right place!</h2>
          </div>
        </div>
        <div className={classes["image-1"]}>
          <div
            className={classes["img"]}
            style={{ backgroundImage: `url(${img1})` }}
          ></div>
        </div>
      </div>
      <div className={classes["main-land-2"]}>
        <div
          className={classes["img1"]}
          style={{ backgroundImage: `url(${side1})` }}
        ></div>
        <div className={classes["signin"]}>
          <Link to="/login">
            <button className={classes["btn-1"]}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={classes["btn-2"]}>Signup</button>
          </Link>
        </div>
        <div
          className={classes["img2"]}
          style={{ backgroundImage: `url(${side2})` }}
        ></div>
      </div>

      <div className={classes["row"]}>
        <div className={classes["card1"]}>
          <div className={classes["c-head"]}>
            <h2>BEST COMMUNITY</h2>
          </div>
          <div className={classes["c-body"]}>
            <p>
              G’day, we’re Atlassian. We make tools like Jira and Trello that
              are used by thousands of teams worldwide. And we’re serious about
              creating amazing products, practices, and open work for all teams.
            </p>
          </div>
        </div>
        <div className={classes["card2"]}>
          <div className={classes["c-head"]}>
            {" "}
            <h2>BEST COMMUNITY</h2>
          </div>
          <div className={classes["c-body"]}>
            <p>
              G’day, we’re Atlassian. We make tools like Jira and Trello that
              are used by thousands of teams worldwide. And we’re serious about
              creating amazing products, practices, and open work for all teams.
            </p>
          </div>
        </div>
        <div className={classes["card3"]}>
          <div className={classes["c-head"]}>
            {" "}
            <h2>BEST COMMUNITY</h2>
          </div>
          <div className={classes["c-body"]}>
            <p>
              G’day, we’re Atlassian. We make tools like Jira and Trello that
              are used by thousands of teams worldwide. And we’re serious about
              creating amazing products, practices, and open work for all teams.
            </p>
          </div>
        </div>
      </div>

      <div className={classes["main-land-3"]}>
        <div
          className={classes["mid-img"]}
          style={{ backgroundImage: `url(${mid})` }}
        ></div>
      </div>

      <div className={classes["main-land-4"]}>
        <div className={classes["child1"]}>
          <div
            className={classes["img-4"]}
            style={{ backgroundImage: `url(${comm})` }}
          ></div>
        </div>
        <div className={classes["child2"]}>
          <div className={classes["cards"]}>
            <div className={classes["card-item"]}>
              <p>HTML</p>
            </div>
            <div className={classes["card-item"]}>
              <p>CSS</p>
            </div>
            <div className={classes["card-item"]}>
              <p>Competitive Programming</p>
            </div>
            <div className={classes["card-item"]}>
              <p>Machine Learning</p>
            </div>
            <div className={classes["card-item"]}>
              <p>React-</p>
            </div>
            <div className={classes["card-item"]}>
              <p>JS</p>
            </div>
            <div className={classes["card-item"]}>
              <p>Python</p>
            </div>
            <div className={classes["card-item"]}>
              <p>Jquery</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Home);

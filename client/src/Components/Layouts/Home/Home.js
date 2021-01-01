import React, { Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import classes from "./home.module.css";
import img1 from "../../../assets/coder-girl.svg";
import side1 from "../../../assets/side1.svg";
import side2 from "../../../assets/side2.svg";
import mid from "../../../assets/mid.svg";
import comm from "../../../assets/comm.svg";
import Logo from "../Logo/Logo";
import { useSpring, animated } from "react-spring";

const Home = (props) => {
  const animationProps = useSpring({
    config: { mass: 1, tension: 120, friction: 14 },
    delay: 200,
    from: { marginLeft: -100, opacity: 0 },
    to: { marginLeft: 0, opacity: 1 },
  });
  return (
    <Fragment>
      <div className={classes["main-land-1"]}>
        <div className={classes["head"]}>
          <div className={classes["logo"]}>
            <animated.div style={animationProps}>
              <h2>
                SMIT <Logo />
              </h2>
            </animated.div>
            <animated.div style={animationProps}>
              <h2>DevBlock</h2>
            </animated.div>
          </div>
          <div className={classes["text"]}>
            <h3>Your daily crunch of tech & awesomeness!</h3>
            <h4>Join the amazing community and be a part of it.</h4>
            <div className={classes["join"]}>
              <Link className={classes["btn-1"]} to="/login">
                Login
              </Link>
              <Link className={classes["btn-2"]} to="/signup">
                SignUp
              </Link>
            </div>
          </div>
        </div>
        <div className={classes["image-1"]}>
          <div
            className={classes["img"]}
            style={{ backgroundImage: `url(${img1})` }}
          ></div>
        </div>
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

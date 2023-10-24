import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HandshakeIcon from "@mui/icons-material/Handshake";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Accordion from "../components/Accordion"
const Plan = () => {
  return (
    <div>
      <div className="wrapper wrapper__full">
        <div className="sidebar__overlay sidebar__overlay--hidden"></div>
        <div className="plan">
          <div className="plan__header--wrapper">
            <div className="plan__header">
              <div className="plan__title">
                Get unlimited access to many amazing books to read
              </div>
              <div className="plan__sub--title">
                Turn ordinary moments into amazing learning opportunities
              </div>
              <figure className="plan__img--mask">
                <img
                  src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpricing-top.4d86e93a.png&w=1080&q=75"
                  className="plan__img"
                ></img>
              </figure>
            </div>
          </div>
          <div className="plan__row">
            <div className="plan__container">
              <div className="plan__features--wrapper">
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <DescriptionIcon
                      style={{ width: "60px", height: "60px" }}
                    />
                  </figure>
                  <div className="plan__features--text">
                    <b>Key ideas in a few min </b>
                    with many books to read
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <LocalFloristIcon
                      style={{ width: "60px", height: "60px" }}
                    />
                  </figure>
                  <div className="plan__features--text">
                    <b>3 million </b>
                    people growing with Summarist everday
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <HandshakeIcon style={{ width: "60px", height: "60px" }} />
                  </figure>
                  <div className="plan__features--text">
                    <b>Precise recommendations </b>
                    collections curated by experts
                  </div>
                </div>
              </div>
              <div className="section__title">
                Choose the plan that fits you
              </div>
              <div className="plan__card plan__card--active">
                <div className="plan__card--circle">
                  <div className="plan__card--dot"></div>
                </div>
                <div className="plan__card--content">
                  <div className="plan__card--title">Premium Plus Yearly</div>
                  <div className="plan__card--price">$99.99/year</div>
                  <div className="plan__card--text">
                    7-day free trial included
                  </div>
                </div>
              </div>
              <div className="plan__card--separator">
                <div className="plan__separator">or</div>
              </div>
              <div className="plan__card ">
                <div className="plan__card--circle"></div>
                <div className="plan__card--content">
                  <div className="plan__card--title">Premium Monthly</div>
                  <div className="plan__card--price">$9.99/month</div>
                  <div className="plan__card--text">No trial included</div>
                </div>
              </div>
              <div className="plan__card--cta">
                <span className="btn--wrapper">
                  <button style={{ width: "300px" }} className="plan__btn">
                    Start your free 7-day trial
                  </button>
                </span>
                <div className="plan__disclaimer">
                  Cancel your trial at any time before it ends, and you won’t be
                  charged.
                </div>
              </div>
    <Accordion/>
            </div>
          </div>
          <section id="footer">
            <div className="footer__container">
              <div className="footer__row">
                <div className="footer__top--wrapper">
                  <div className="footer__block">
                    <div className="footer__link--title">Actions</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Magazine</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Cancel Subscription</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Help</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Contact us</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Useful Links</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Magazine</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Cancel Subscription</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Help</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Contact us</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Company</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Magazine</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Cancel Subscription</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Help</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Contact us</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Other</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Magazine</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Cancel Subscription</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Help</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Contact us</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer__copyright--wrapper">
                  <div className="footer__copyright">
                    Copyright © 2023 Summarist.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Plan;

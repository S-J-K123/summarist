import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HandshakeIcon from "@mui/icons-material/Handshake";
import createMonthlyCheckoutSession from "@component/stripe/createMonthlyCheckoutSession";
import createYearlyCheckoutSession from "@component/stripe/createYearlyCheckoutSession";
import isUserPremium from "@component/stripe/isUserPremium";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth, setUser } from "../redux/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Accordion from "../components/Accordion";
import { SpinnerCircularFixed } from "spinners-react";

const Plan = () => {
  const dispatch = useDispatch();
  const userIsPremium = isUserPremium();
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (planType) => {
    console.log("Clicked on card with planType:", planType);
    setSelectedPlan(planType);
    setSelectedCard(planType);
  };

  const [yearlyDisclaimer, setYearlyDisclaimer] = useState(
    "Cancel your trial at any time before it ends, and you won’t be charged for the yearly plan."
  );
  const [monthlyDisclaimer, setMonthlyDisclaimer] = useState(
    "30-day money back guarantee, no questions asked."
  );

  useEffect(() => {
    dispatch(initializeAuth());
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        const userObj = {
          uid: user.uid,
          email: user.email,
        };
        console.log(userObj);
        dispatch(setUser(userObj));
      } else {
      }
    });
    return () => unsubscribe();
  }, [user]);

  const accordionData = [
    {
      title: "How does the free 7-day trial work?",
      content:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      title:
        "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      content:
        "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
      title: "What's included in the Premium plan?",
      content:
        "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
    },
    {
      title: "Can I cancel during my trial or subscription?",
      content:
        "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
    },
  ];

  const handleTrialButtonClick = async () => {
    try {
      setLoading(true);
      await createYearlyCheckoutSession(user.uid);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthlyButtonClick = async () => {
    try {
      setLoading(true);
      await createMonthlyCheckoutSession(user.uid);
    } finally {
      setLoading(false);
    }
  };

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
                  alt="plan-image"
                />
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
                    people growing with Summarist every day
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
              <div
                className={`plan__card ${
                  selectedCard === "yearly" ? "plan__card--active-green" : ""
                }`}
                onClick={() => handleCardClick("yearly")}
              >
                <div className="plan__card--circle">
                  {selectedPlan === "yearly" && (
                    <div className="plan__card--dot"></div>
                  )}
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
              <div
                className={`plan__card ${
                  selectedCard === "monthly" ? "plan__card--active-green" : ""
                }`}
                onClick={() => handleCardClick("monthly")}
              >
                <div className="plan__card--circle">
                  {selectedPlan === "monthly" && (
                    <div className="plan__card--dot"></div>
                  )}
                </div>
                <div className="plan__card--content">
                  <div className="plan__card--title">Premium Monthly</div>
                  <div className="plan__card--price">$9.99/month</div>
                  <div className="plan__card--text">No trial included</div>
                </div>
              </div>
              <div className="plan__card--cta">
                <span className="btn--wrapper">
                  {loading ? (
                    <SpinnerCircularFixed
                      size={40}
                      thickness={150}
                      speed={100}
                      color="#007bff"
                    />
                  ) : selectedPlan === "yearly" ? (
                    <button
                      onClick={() => handleTrialButtonClick()}
                      style={{ width: "300px" }}
                      className="plan__btn"
                    >
                      Start your free 7-day trial
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMonthlyButtonClick()}
                      style={{ width: "300px" }}
                      className="plan__btn"
                    >
                      Start your first month
                    </button>
                  )}
                </span>
                <div className="plan__disclaimer">
                  Cancel your trial at any time before it ends, and you won’t be
                  charged.
                </div>
              </div>

              <div className="accordion__container">
                {accordionData.map(({ title, content }, index) => (
                  <Accordion key={index} title={title} content={content} />
                ))}
              </div>
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

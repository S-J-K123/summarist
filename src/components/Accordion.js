import React, { useState } from 'react';
import DescriptionIcon from "@mui/icons-material/Description";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HandshakeIcon from "@mui/icons-material/Handshake";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Accordion = () => {
const [faqs, setFaqs] = useState([
    {
        question: " How does the free 7-day trial work?",
        answer: "   Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial. ",
        open: true
    },
])


    return (
        <div>
                  <div className="faq__wrapper">
                <div className="accordion__card">
                  <div className="accordion__header">
                    <div className="accordion__title">
                      How does the free 7-day trial work?
                    </div>
                    <KeyboardArrowUpIcon
                      style={{ height: "1em", width: "1em" }}
                      className="accordion__icon"
                    />
                  </div>

                  <div style={{ height: "0px" }} className="collapse"></div>
                  <div  className="accordion__body">
                    Begin your complimentary 7-day trial with a Summarist annual
                    membership. You are under no obligation to continue your
                    subscription, and you will only be billed when the trial
                    period expires. With Premium access, you can learn at your
                    own pace and as frequently as you desire, and you may
                    terminate your subscription prior to the conclusion of the
                    7-day free trial.
                  </div>
                </div>
                <div className="accordion__card">
                  <div className="accordion__header">
                    <div className="accordion__title">
                    Can I switch subscriptions from monthly to yearly, or yearly to monthly?
                    </div>
                    <KeyboardArrowUpIcon
                      style={{ height: "1em", width: "1em" }}
                      className="accordion__icon"
                    />
                  </div>

                  <div style={{ height: "0px" }} className="collapse"></div>
                  <div className="accordion__body">
                    While an annual plan is active, it is not feasible to switch
                    to a monthly plan. However, once the current month ends,
                    transitioning from a monthly plan to an annual plan is an
                    option.
                  </div>
                </div>
                <div className="accordion__card">
                  <div className="accordion__header">
                    <div className="accordion__title">
                    What's included in the Premium plan?
                    </div>
                    <KeyboardArrowUpIcon
                      style={{ height: "1em", width: "1em" }}
                      className="accordion__icon"
                    />
                  </div>

                  <div style={{ height: "0px" }} className="collapse"></div>
                  <div className="accordion__body">
                    Premium membership provides you with the ultimate Summarist
                    experience, including unrestricted entry to many
                    best-selling books high-quality audio, the ability to
                    download titles for offline reading, and the option to send
                    your reads to your Kindle.
                  </div>
                </div>
                <div className="accordion__card">
                  <div className="accordion__header">
                    <div className="accordion__title">
                    Can I cancel during my trial or subscription?
                    </div>
                    <KeyboardArrowUpIcon
                      style={{ height: "1em", width: "1em" }}
                      className="accordion__icon"
                    />
                  </div>

                  <div style={{ height: "0px" }} className="collapse"></div>
                  <div className="accordion__body">
                    You will not be charged if you cancel your trial before its
                    conclusion. While you will not have complete access to the
                    entire Summarist library, you can still expand your
                    knowledge with one curated book per day.
                  </div>
                </div>
              </div>
        </div>
    );
}

export default Accordion;

import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HandshakeIcon from "@mui/icons-material/Handshake";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const FAQ = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={"faq " + (faq.open ? 'open' : "")}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">
        <div className="accordion__card">
          <div className="accordion__header">
            <div className="accordion__title">{faq.question}</div>
            <KeyboardArrowUpIcon
              style={{ height: "1em", width: "1em" }}
              className="accordion__icon"
            />
          </div>
        </div>
      </div>

      <div className="faq-answer">
        <div style={{ height: "0px" }} className="collapse">
          <div className="accordion__body">{faq.answer}</div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

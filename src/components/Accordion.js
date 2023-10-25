import { useState } from "react";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

export default function Accordion({ title, content }) {
  const [activeAccordion, setActiveAccordion] = useState(false);

  return (
    <>
      <div className="accordion__card">
        <div
          className="accordion__header"
          onClick={() => setActiveAccordion(!activeAccordion)}
        >
          <div className="accordion__title">{title}</div>
          <div>
            {activeAccordion ? (
              <BsChevronCompactUp className="accordion__icon" />
            ) : (
              <BsChevronCompactDown
                className="accordion__icon"
              />
            )}
          </div>
        </div>
        {activeAccordion && <div className="accordion__body">{content}</div>}
      </div>
    </>
  );
}
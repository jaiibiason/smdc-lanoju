import React, { useState } from "react";
import "../css/Faqs.css"; // Import the new CSS file

const faqsData = [
  {
    question: "Why invest in real estate in the Philippines?",
    answer: "The Philippines offers a growing economy, strategic location, and competitive property prices, making it an attractive investment destination.",
  },
  {
    question: "How do I reserve a unit?",
    answer: "You can reserve a unit by contacting our sales team and providing the necessary documents and reservation fee.",
  },
  {
    question: "What are the available financing options?",
    answer: "We offer various financing options, including bank loans, in-house financing, and deferred payment schemes.",
  },
  {
    question: "Can I negotiate the price or terms?",
    answer: "Yes, our sales team can assist you in negotiating the price or terms based on your preferences.",
  },
  {
    question: "What taxes and fees should I expect?",
    answer: "You should expect taxes such as VAT, transfer tax, and registration fees, along with other miscellaneous charges.",
  },
];

const Faqs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqs">
      <h2>Frequently Asked Questions</h2>
      <div className="faqs-list">
        {faqsData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFaq(index)}
            >
              <span className="faq-icon">
                {activeIndex === index ? 
                "▲" : 
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2468 1.15766L7.9993 7.24766L1.7518 1.15766C1.64018 1.04862 1.49034 0.987578 1.3343 0.987578C1.17826 0.987578 1.02842 1.04862 0.916802 1.15766C0.862755 1.21062 0.819817 1.27382 0.790505 1.34358C0.761192 1.41334 0.746094 1.48824 0.746094 1.56391C0.746094 1.63958 0.761192 1.71448 0.790505 1.78424C0.819817 1.854 0.862755 1.9172 0.916802 1.97016L7.56305 8.45016C7.67977 8.56393 7.83631 8.6276 7.9993 8.6276C8.16229 8.6276 8.31884 8.56393 8.43555 8.45016L15.0818 1.97141C15.1362 1.91841 15.1795 1.85505 15.209 1.78506C15.2386 1.71507 15.2538 1.63988 15.2538 1.56391C15.2538 1.48794 15.2386 1.41274 15.209 1.34276C15.1795 1.27277 15.1362 1.2094 15.0818 1.15641C14.9702 1.04737 14.8203 0.986328 14.6643 0.986328C14.5083 0.986328 14.3584 1.04737 14.2468 1.15641V1.15766Z" fill="#343434"/>
                </svg>
                }
              </span>
              <span>{faq.question}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <a href="#" className="view-more-faqs">
        view more FAQs <span>→</span>
      </a>
    </section>
  );
};

export default Faqs;

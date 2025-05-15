import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.75253 7.84258L8.00003 1.75258L14.2475 7.84258C14.3591 7.95162 14.509 8.01267 14.665 8.01267C14.8211 8.01267 14.9709 7.95162 15.0825 7.84258C15.1366 7.78963 15.1795 7.72642 15.2088 7.65666C15.2381 7.58691 15.2532 7.512 15.2532 7.43633C15.2532 7.36067 15.2381 7.28576 15.2088 7.21601C15.1795 7.14625 15.1366 7.08304 15.0825 7.03008L8.43628 0.550085C8.31956 0.436317 8.16302 0.372645 8.00003 0.372645C7.83704 0.372645 7.68049 0.436317 7.56378 0.550085L0.917525 7.02883C0.863096 7.08183 0.819834 7.14519 0.790295 7.21518C0.760756 7.28517 0.745538 7.36037 0.745538 7.43633C0.745538 7.5123 0.760756 7.5875 0.790295 7.65749C0.819834 7.72748 0.863096 7.79084 0.917525 7.84383C1.02914 7.95287 1.17899 8.01392 1.33503 8.01392C1.49106 8.01392 1.64091 7.95287 1.75253 7.84383V7.84258Z" fill="black"/>
                </svg>
                 : 
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
      <NavLink className={"view-more-faqs"} to="/faqs">
        view more FAQs 
        <span>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.451987 1.58023L1.51299 0.520235L7.29199 6.29723C7.38514 6.3898 7.45907 6.49988 7.50952 6.62113C7.55997 6.74238 7.58594 6.87241 7.58594 7.00373C7.58594 7.13506 7.55997 7.26509 7.50952 7.38634C7.45907 7.50759 7.38514 7.61767 7.29199 7.71023L1.51299 13.4902L0.452987 12.4302L5.87699 7.00523L0.451987 1.58023Z" fill="#1A3D8F"/>
        </svg>
        </span>
      </NavLink>
      
    </section>
  );
};

export default Faqs;

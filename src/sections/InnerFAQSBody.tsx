import React from "react";
import magnifyingGlassIcon from "../assets/ph_magnifying-glass-light.svg"; // Import the icon

const InnerFAQSBody: React.FC<{ title: string; question: string }> = ({ title, question }) => {
  const faqCards = [
    {
      title: "What to Know Before Buying",
      questions: ["Why invest in real estate in the Philippines?", "What is the difference between pre-selling and ready-for-occupancy?", "How much should I budget for a condo investment?", "What is the difference between downpayment and amortization?", "What taxes and fees should I expect?"],
    },
    {
      title: "Pricing",
      questions: ["Are there any hidden fees?", "Do you offer discounts?"],
    },
    {
      title: "Technical Support",
      questions: ["How do I reset my password?", "What browsers are supported?"],
    },
    {
      title: "Account Management",
      questions: ["How do I update my profile?", "Can I delete my account?"],
    },
  ];

  const allQuestions = faqCards.flatMap((card) =>
    card.questions.map((q) => ({ category: card.title, question: q }))
  );

  return (
    <div className="inner-faqs-body">
      <div className="faq-body-container">
        <div className="left-main-section">
          <div className="search-bar-container">
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Search properties..." 
            />
            <span className="search-icon">
              <img src={magnifyingGlassIcon} alt="Search" />
            </span>
          </div>
          <div className="all-questions-container">
            <h3>All Questions</h3>
            <ul>
              {allQuestions.map((item, index) => (
                <li key={index} className="question-item">
                  <strong>{item.category}:</strong> {item.question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerFAQSBody;

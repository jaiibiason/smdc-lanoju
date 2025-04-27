import React from "react";
import "../css/FAQ.css"; // Import styles
import magnifyingGlassIcon from "../assets/ph_magnifying-glass-light.svg"; // Import the icon

const FAQBody: React.FC = () => {
  const faqCards = [
    {
      title: "What to Know Before Buying",
      questions: ["Why invest in real estate in the Philippines?", "What is the difference between pre-selling and ready-for-occupancy?" , "How much should I budget for a condo investment?", ],
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

  return (
    <div>
      <div className="faq-search-bar-container">
        <input 
          type="text" 
          className="faq-search-bar" 
          placeholder="Have a question in mind?" 
        />
        <span className="faq-search-icon">
          <img src={magnifyingGlassIcon} alt="Search" />
        </span>
      </div>
      <div className="faq-cards-container">
        {faqCards.map((card, index) => (
          <div key={index} className="faq-card">
            <h3 className="faq-card-title">{card.title}</h3>
            <ul className="faq-card-questions">
              {card.questions.map((question, qIndex) => (
                <li key={qIndex} className="faq-card-question">{question}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQBody;

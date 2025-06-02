import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/FAQ.css"; // Import styles
import magnifyingGlassIcon from "../assets/ph_magnifying-glass-light.svg"; // Import the icon

const FAQBody: React.FC = () => {
  const navigate = useNavigate();

  const handleQuestionClick = (question: string, title: string) => {
    navigate("/faqs/inner", { state: { question, title } });
  };

  const faqCards = [
    {
      title: "What to Know Before Buying",
      questions: ["Why invest in real estate in the Philippines?", "What is the difference between pre-selling and ready-for-occupancy?" , "How much should I budget for a condo investment?", "What is the difference between downpayment and amortization?", "What taxes and fees should I expect?"],
    },
    {
      title: "What to Know When Deciding",
      questions: ["How do I choose the right property for my needs?", "How do I verify property legitimacy and avoid scams?", "Can I buy a property remotely while abroad?"],
    },
    {
      title: "Actual Buying Process",
      questions: ["How do I reserve a unit?", "What documents do I need to prepare?", "How long does the buying process take?", "Can I negotiate the price or terms?"],
    },
    {
        title: "Payment Process & Financing",
        questions: ["What are the available financing options?", "How does bank financing work for condo purchases?", "What are the penalties for late payment?"],
    },
    {
      title: "Property Turnover",
      questions: ["What happens during the turnover process?", "How do I check for property defects before acceptance?", "What fees should I expect at turnover?", "Can I make renovations or modifications after turnover?"],
    },
    {
      title: "Managing the Property After Turnover",
      questions: ["How do I set up utilities (electricity, water, internet)?", "What are the rules of the building for Airbnb rentals?", "What happens if I fail to pay condo dues?", "How do I sell my condo unit?"],
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
                <li 
                  key={qIndex} 
                  className="faq-card-question" 
                  onClick={() => handleQuestionClick(question, card.title)}
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQBody;

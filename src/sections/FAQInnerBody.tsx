import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/FAQ.css";
import magnifyingGlassIcon from "../assets/ph_magnifying-glass-light.svg";

const faqCards = [
    {
        title: "What to Know Before Buying",
        questions: [
            "Why invest in real estate in the Philippines?",
            "What is the difference between pre-selling and ready-for-occupancy?" ,
            "How much should I budget for a condo investment?",
            "What is the difference between downpayment and amortization?",
            "What taxes and fees should I expect?"
        ],
    },
    {
        title: "What to Know When Deciding",
        questions: [
            "How do I choose the right property for my needs?",
            "How do I verify property legitimacy and avoid scams?",
            "Can I buy a property remotely while abroad?"
        ],
    },
    {
        title: "Actual Buying Process",
        questions: [
            "How do I reserve a unit?",
            "What documents do I need to prepare?",
            "How long does the buying process take?",
            "Can I negotiate the price or terms?"
        ],
    },
    {
        title: "Payment Process & Financing",
        questions: [
            "What are the available financing options?",
            "How does bank financing work for condo purchases?",
            "What are the penalties for late payment?"
        ],
    },
    {
        title: "Property Turnover",
        questions: [
            "What happens during the turnover process?",
            "How do I check for property defects before acceptance?",
            "What fees should I expect at turnover?",
            "Can I make renovations or modifications after turnover?"
        ],
    },
    {
        title: "Managing the Property After Turnover",
        questions: [
            "How do I set up utilities (electricity, water, internet)?",
            "What are the rules of the building for Airbnb rentals?",
            "What happens if I fail to pay condo dues?",
            "How do I sell my condo unit?"
        ],
    },
];

const FAQInnerBody: React.FC = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const selectedTitle = location.state?.title;
    const selectedQuestion = location.state?.question;

    // Find the initial open index and active question only once on mount
    const getInitialOpenIndex = () => {
        if (selectedTitle) {
            const idx = faqCards.findIndex(card => card.title === selectedTitle);
            return idx !== -1 ? idx : null;
        }
        return null;
    };
    const getInitialActiveQuestion = () => selectedQuestion || null;

    const [openIndex, setOpenIndex] = useState<number | null>(getInitialOpenIndex);
    const [activeQuestion, setActiveQuestion] = useState<string | null>(getInitialActiveQuestion);

    useEffect(() => {
        // If location.state changes (e.g., on navigation), update openIndex and activeQuestion
        if (selectedTitle) {
            const idx = faqCards.findIndex(card => card.title === selectedTitle);
            setOpenIndex(idx !== -1 ? idx : null);
        }
        if (selectedQuestion) {
            setActiveQuestion(selectedQuestion);
        }
    }, [selectedTitle, selectedQuestion]);

    const handleTitleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleQuestionClick = (question: string, title: string) => {
        navigate("/faqs/inner", { state: { question, title } });
      };
    

    return (
        <div className="main-body faq-inner-layout">
            <div className="faq-left-main-section">
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
                <div>
                    {faqCards.map((card, index) => (
                        <div key={index}>
                            <h3
                                className="faq-section-title"
                                onClick={() => handleTitleClick(index)}
                            >
                                {card.title}
                            </h3>
                            {openIndex === index && (
                                <ul className="faq-questions-list">
                                    {card.questions.map((question, qIndex) => (
                                        <li
                                            key={qIndex}
                                            className={
                                                "faq-question-item" +
                                                (activeQuestion === question ? " highlighted" : "")
                                            }
                                            onClick={() => handleQuestionClick(question, card.title)}
                                        >
                                            {question}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="faq-right-main-section">
                <h1 className="faq-selected-question">
                    {activeQuestion || "Select a question"}
                </h1>
            </div>
        </div>
    );
};

export default FAQInnerBody;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/FAQ.css";
import magnifyingGlassIcon from "../assets/ph_magnifying-glass-light.svg";

const faqCards = [
    {
        title: "What to Know Before Buying",
        questions: [
            { question: "Why invest in real estate in the Philippines?", answer: "Answer here" },
            { question: "What is the difference between pre-selling and ready-for-occupancy?", answer: "Answer here" },
            { question: "How much should I budget for a condo investment?", answer: "Answer here" },
            { question: "What is the difference between downpayment and amortization?", answer: "Answer here" },
            { question: "What taxes and fees should I expect?", answer: "Answer here" }
        ],
    },
    {
        title: "What to Know When Deciding",
        questions: [
            { question: "How do I choose the right property for my needs?", answer: "Answer here" },
            { question: "How do I verify property legitimacy and avoid scams?", answer: "Answer here" },
            { question: "Can I buy a property remotely while abroad?", answer: "Answer here" }
        ],
    },
    {
        title: "Actual Buying Process",
        questions: [
            { question: "How do I reserve a unit?", answer: "Answer here" },
            { question: "What documents do I need to prepare?", answer: "Answer here" },
            { question: "How long does the buying process take?", answer: "Answer here" },
            { question: "Can I negotiate the price or terms?", answer: "Answer here" }
        ],
    },
    {
        title: "Payment Process & Financing",
        questions: [
            { question: "What are the available financing options?", answer: "Answer here" },
            { question: "How does bank financing work for condo purchases?", answer: "Answer here" },
            { question: "What are the penalties for late payment?", answer: "Answer here" }
        ],
    },
    {
        title: "Property Turnover",
        questions: [
            { question: "What happens during the turnover process?", answer: "Answer here" },
            { question: "How do I check for property defects before acceptance?", answer: "Answer here" },
            { question: "What fees should I expect at turnover?", answer: "Answer here" },
            { question: "Can I make renovations or modifications after turnover?", answer: "Answer here" }
        ],
    },
    {
        title: "Managing the Property After Turnover",
        questions: [
            { question: "How do I set up utilities (electricity, water, internet)?", answer: "Answer here" },
            { question: "What are the rules of the building for Airbnb rentals?", answer: "Answer here" },
            { question: "What happens if I fail to pay condo dues?", answer: "Answer here" },
            { question: "How do I sell my condo unit?", answer: "Answer here" }
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

    // Detect mobile
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 780);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Find the answer for the active question
    const getActiveAnswer = () => {
        for (const card of faqCards) {
            const found = card.questions.find(q => q.question === activeQuestion);
            if (found) return found.answer;
        }
        return "";
    };

    return (
        <div className="main-body faq-inner-layout" style={isMobile ? { display: "block" } : {}}>
            {isMobile ? (
                <>
                    <div className="faq-right-main-section">
                        <h1 className="faq-selected-question">
                            {activeQuestion || "Select a question"}
                        </h1>
                        {activeQuestion && (
                            <div className="faq-selected-answer">
                                {getActiveAnswer()}
                            </div>
                        )}
                    </div>
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
                                            {card.questions.map((item, qIndex) => (
                                                <li
                                                    key={qIndex}
                                                    className={
                                                        "faq-question-item" +
                                                        (activeQuestion === item.question ? " highlighted" : "")
                                                    }
                                                    onClick={() => handleQuestionClick(item.question, card.title)}
                                                >
                                                    {item.question}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
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
                                            {card.questions.map((item, qIndex) => (
                                                <li
                                                    key={qIndex}
                                                    className={
                                                        "faq-question-item" +
                                                        (activeQuestion === item.question ? " highlighted" : "")
                                                    }
                                                    onClick={() => handleQuestionClick(item.question, card.title)}
                                                >
                                                    {item.question}
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
                        {activeQuestion && (
                            <div className="faq-selected-answer">
                                {getActiveAnswer()}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default FAQInnerBody;
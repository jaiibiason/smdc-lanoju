import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InnerArticlesBody: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const article = location.state?.article;

    if (!article) {
        return (
            <div className="inner-article-not-found">
                <p>Article not found.</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <>
            <div className="container">
                {/* Left Section - Text */}
                <div className="inart-text-section">
                    <h2 className="inner-article-title">{article.title}</h2>
                </div>
                {/* Right Section - Image */}
                <div className="image-section">
                    <img
                        src={import.meta.env.BASE_URL + article.image}
                        alt={article.title}
                        className="inner-article-image"
                    />
                </div>
            </div>
            <div className="inart-article-meta">
                <div className="author-date">
                    <span>{article.date}</span>
                    <span>Written by: {article.author}</span>
                </div>
                <span>5 mins to read</span>
            </div>

            { /*Insert Article  */}

    
        </>
    );
};

export default InnerArticlesBody;

import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Articles.css";

interface Article {
  image: string;
  title: string;
  date: string;
  author: string;
  category: "Blog" | "News";
  description: string;
}

const horizontalArticles: Article[] = [
  {
    image: "/assets/featured_properties/shore.png",
    title: "Philippine Real Estate Market Trends: What to Expect in 2024",
    date: "February 15, 2024",
    author: "Francisca Reyes",
    category: "Blog",
    description:
      "The Philippine real estate market is poised for significant growth in 2024, driven by economic recovery and increased demand for residential and commercial properties. In this article, we explore the key trends shaping the market and what investors should watch out for.",
  },
  {
    image: "/assets/featured_properties/shore.png",
    title: "Philippine Real Estate Market Trends: What to Expect in 2024",
    date: "February 15, 2024",
    author: "Francisca Reyes",
    category: "Blog",
    description:
      "The Philippine real estate market is poised for significant growth in 2024, driven by economic recovery and increased demand for residential and commercial properties. In this article, we explore the key trends shaping the market and what investors should watch out for.",
  },
  {
    image: "/assets/featured_properties/shore.png",
    title: "Philippine Real Estate Market Trends: What to Expect in 2024",
    date: "February 15, 2024",
    author: "Francisca Reyes",
    category: "Blog",
    description:
      "The Philippine real estate market is poised for significant growth in 2024, driven by economic recovery and increased demand for residential and commercial properties. In this article, we explore the key trends shaping the market and what investors should watch out for.",
  },
  {
    image: "/assets/featured_properties/shore.png",
    title: "Philippine Real Estate Market Trends: What to Expect in 2024",
    date: "February 15, 2024",
    author: "Francisca Reyes",
    category: "Blog",
    description:
      "The Philippine real estate market is poised for significant growth in 2024, driven by economic recovery and increased demand for residential and commercial properties. In this article, we explore the key trends shaping the market and what investors should watch out for.",
  },
];

const ArticlesrecoReads: React.FC = () => {
    return (
        <div className="articles-reco-reads">
            <h4 className="articles-reco-reads-title">Recommended Reads Just for You</h4>
            <div className="articles-pg-horizontal-articles" style={{ padding: "0 32px 50px" }}>
                {horizontalArticles.map((article, index) => (
                    <NavLink
                        to={`/articles/${index}`}
                        key={index}
                        state={{
                            article: {
                                image: article.image,
                                title: article.title,
                                date: article.date,
                                author: article.author,
                                category: article.category,
                                description: article.description,
                            }
                        }}
                    >
                        <div className="articles-pg-horizontal-article-card">
                            <div className="articles-pg-horizontal-img-top">
                                <img src={import.meta.env.BASE_URL + article.image} alt="" />
                            </div>
                            <div className="articles-pg-horizontal-details">
                                <h2>{article.title}</h2>
                                <div className="articles-pg-horizontal-details-meta">
                                    <h3>{article.date}</h3>
                                    <h3>{article.author}</h3>
                                    <span
                                        className={`articles-pg-category ${
                                            article.category === "News" ? "news" : "blog"
                                        }`}
                                    >
                                        {article.category}
                                    </span>
                                </div>
                                <p>{article.description}</p>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default ArticlesrecoReads;
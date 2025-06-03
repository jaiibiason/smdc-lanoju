import React from "react";
import magnifyingGlassIcon from "../assets/ph_magnifying-glass-light.svg"; // Import the icon
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

// Sample Properties Data
const featuredArticle: Article[] = [
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
const recentArticles: Article[] = [
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

const ArticlesBody: React.FC = () => {
    return (
        <div className="articles-body-wrapper">
            <div className="article-search-bar-container">
                <input 
                    type="text" 
                    className="article-search-bar" 
                    placeholder="Search for a topic..." 
                />
                <span className="faq-search-icon">
                    <img src={magnifyingGlassIcon} alt="Search" />
                </span>
            </div>
            <div className="articles-pg-news-insights-cont">
                {featuredArticle.map((article, index) => (
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
                        <div
                            className="articles-pg-featured-article"
                            style={{
                                backgroundImage: `url(${
                                    import.meta.env.BASE_URL + article.image
                                })`,
                            }}
                        >
                            <div className="articles-pg-feat-article-details">
                                <div className="articles-pg-article-title">
                                    <h2> {article.title} </h2>
                                    <h3> {article.date} </h3>
                                    <h3> {article.author} </h3> <br />
                                    <h4
                                        className={`articles-pg-category ${
                                            article.category === "News" ? "news" : "blog"
                                        }`}
                                    >
                                        {article.category}
                                    </h4>
                                </div>
                                <p>{article.description}</p>
                            </div>
                        </div>
                    </NavLink>
                ))}

                <div className="articles-pg-recent-articles">
                    {recentArticles.map((article, index) => (
                        <NavLink
                            to={`/articles/${index + featuredArticle.length}`}
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
                            <div className="articles-pg-recent-article">
                                <div className="articles-pg-article-img">
                                    <img src={import.meta.env.BASE_URL + article.image} alt="" />
                                </div>
                                <div className="articles-pg-article-details">
                                    <h2> {article.title} </h2>
                                    <h3> {article.date} </h3>
                                    <h3> {article.author} </h3>
                                    <h4
                                        className={`articles-pg-category ${
                                            article.category === "News" ? "news" : "blog"
                                        }`}
                                    >
                                        {article.category}
                                    </h4>
                                    <p> {article.description} </p>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="articles-pg-horizontal-articles">
                {horizontalArticles.map((article, index) => (
                    <NavLink
                        to={`/articles/${index + featuredArticle.length + recentArticles.length}`}
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
}

export default ArticlesBody;
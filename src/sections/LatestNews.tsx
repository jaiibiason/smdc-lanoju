import React from "react";
import { NavLink } from "react-router-dom";
import "../css/LatestNews.css";

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

const LatestNews: React.FC = () => {
  return (
    <section className="latest-news-cont">
      <div className="title-cont">
        <h1>Latest News & Insights</h1>
        <p>
          Get the latest real estate trends, investment tips, and developer
          updates to stay informed and make smarter property decisions.
        </p>
      </div>

      <div className="news-insights-cont">
        {featuredArticle.map((article, index) => (
          <NavLink to={`/articles/${index}`} key={index}>
            <div
              className="featured-article"
              style={{
                backgroundImage: `url(${
                  import.meta.env.BASE_URL + article.image
                })`,
              }}
            >
              <div className="article-details">
                <div className="article-title">
                  <h2> {article.title} </h2>
                  <h3> {article.date} </h3>
                  <h3> {article.author} </h3> <br />
                  <h4
                    className={`category ${
                      article.category === "News" ? "news" : "blog"
                    }`}
                  >
                    {article.category}
                  </h4>
                </div>
                <p className="description">{article.description}</p>
              </div>
            </div>
          </NavLink>
        ))}

        <div className="recent-articles">
          {recentArticles.map((article, index) => (
            <NavLink to={`/articles/${index}`} key={index}>
              <div className="recent-article">
                <div className="article-img">
                  <img src={import.meta.env.BASE_URL + article.image} alt="" />
                </div>
                <div className="article-details">
                  <h2> {article.title} </h2>
                  <h3> {article.date} </h3>
                  <h3> {article.author} </h3>
                  <h3
                    className={`category ${
                      article.category === "News" ? "news" : "blog"
                    }`}
                  >
                    {article.category}
                  </h3>
                  <p> {article.description} </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="view-more">
        <NavLink to="/articles">
          view more articles
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.451987 1.58023L1.51299 0.520235L7.29199 6.29723C7.38514 6.3898 7.45907 6.49988 7.50952 6.62113C7.55997 6.74238 7.58594 6.87241 7.58594 7.00373C7.58594 7.13506 7.55997 7.26509 7.50952 7.38634C7.45907 7.50759 7.38514 7.61767 7.29199 7.71023L1.51299 13.4902L0.452987 12.4302L5.87699 7.00523L0.451987 1.58023Z"
              fill="#1A3D8F"
            />
          </svg>
        </NavLink>
      </div>
    </section>
  );
};

export default LatestNews;

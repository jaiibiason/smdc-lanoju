import React from "react";
import Slider from "react-slick";
import "../css/ClientSuccessStories.css";

interface Story {
  propImage: string;
  clientImage: string;
  name: string;
  purchase: string;
  purpose: string;
  feedback: string;
}

// Sample Properties Data
const stories: Story[] = [
  {
    propImage: "/assets/featured_properties/shore.png",
    clientImage: "/assets/featured_properties/shore.png",
    name: "Jessica Santos",
    purchase: "Mall of Asia, Pasay City",
    purpose: "₱6,500,000 - ₱24,800,000",
    feedback:
      '"I was looking for a property that I could eventually turn into an Airbnb. Justine helped me choose a high-potential unit, and I feel confident about my investment. Their insights and support were invaluable!/"',
  },
  {
    propImage: "/assets/featured_properties/bloom.png",
    clientImage: "/assets/featured_properties/shore.png",
    name: "Valerie Cruz",
    purchase: "Mall of Asia, Pasay City",
    purpose: "₱6,500,000 - ₱24,800,000",
    feedback: "Ready for Occupancy",
  },
  {
    propImage: "/assets/featured_properties/park.png",
    clientImage: "/assets/featured_properties/shore.png",
    name: "Mark Reyes",
    purchase: "Mall of Asia, Pasay City",
    purpose: "₱6,500,000 - ₱24,800,000",
    feedback: "Ready for Occupancy",
  },
];

const ClientSucccessStories: React.FC = () => {
  // Slider settings
  const settings = {
    // className: "center",
    // centerMode: true,
    // centerPadding: "120px",
    dots: true,
    infinite: true,
    fade: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 500, // Mobile View
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 840, // Mobile View
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1000, // Mobile View
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="client-success-stories-cont">
      <div className="title-cont">
        <h1>Client Success Stories</h1>
        <p>
          See what my clients have to say about their experience working with
          me, from seamless transactions to smart investments.
        </p>
      </div>
      <div className="client-slider-cont">
        <Slider {...settings}>
          {stories.map((story, index) => (
            <div key={index} className="property-client">
              <div className="property-img">
                <img src={import.meta.env.BASE_URL + story.propImage} alt="" />
              </div>

              <div className="client-card">
                <div className="icon-details">
                  <div className="icon">
                    <img
                      src={import.meta.env.BASE_URL + story.clientImage}
                      alt=""
                    />
                  </div>
                  <div className="details">
                    <h2>{story.name}</h2>
                    <h3>Purchased: {story.purchase}</h3>
                    <h3>Purpose: {story.purpose}</h3>
                  </div>
                </div>
                <p>{story.feedback}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

// Arrow Components
const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div className="left-arrow" onClick={onClick}>
    <svg
      width="60"
      height="61"
      viewBox="0 0 60 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="60" height="60" rx="30" fill="#212121" />
      <path
        opacity="0.5"
        d="M50 32.375C50.4973 32.375 50.9742 32.1775 51.3258 31.8258C51.6775 31.4742 51.875 30.9973 51.875 30.5C51.875 30.0027 51.6775 29.5258 51.3258 29.1742C50.9742 28.8225 50.4973 28.625 50 28.625V32.375ZM50 28.625H10V32.375H50V28.625Z"
        fill="#E1A000"
      />
      <path
        d="M25 15.5L10 30.5L25 45.5"
        stroke="#E1A000"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
);

const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div className="right-arrow" onClick={onClick}>
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="60"
        y="60"
        width="60"
        height="60"
        rx="30"
        transform="rotate(-180 60 60)"
        fill="#212121"
      />
      <path
        opacity="0.5"
        d="M10 28.125C9.50272 28.125 9.0258 28.3225 8.67417 28.6742C8.32254 29.0258 8.125 29.5027 8.125 30C8.125 30.4973 8.32254 30.9742 8.67417 31.3258C9.0258 31.6775 9.50272 31.875 10 31.875V28.125ZM10 31.875L50 31.875V28.125L10 28.125V31.875Z"
        fill="#E1A000"
      />
      <path
        d="M35 45L50 30L35 15"
        stroke="#E1A000"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
);

export default ClientSucccessStories;

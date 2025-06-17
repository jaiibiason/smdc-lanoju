import React, { useEffect } from "react";
import Slider from "react-slick";
// import '../App.css'
import "../css/FeaturedProperties.css";

interface Property {
  image: string;
  name: string;
  location: string;
  price: string;
  status: "Ready for Occupancy" | "Preselling";
}

// Sample Properties Data
const properties: Property[] = [
  {
    image: "/assets/featured_properties/shore.png",
    name: "Shore Residences",
    location: "Mall of Asia, Pasay City",
    price: "₱6,500,000 - ₱24,800,000",
    status: "Ready for Occupancy",
  },
  {
    image: "/assets/featured_properties/bloom.png",
    name: "Bloom Residences",
    location: "Sucat, Paranaque",
    price: "₱4,000,000 - ₱6,600,000",
    status: "Ready for Occupancy",
  },
  {
    image: "/assets/featured_properties/park.png",
    name: "Parkville",
    location: "Bacolod City",
    price: "₱2,700,000 - ₱4,300,000",
    status: "Ready for Occupancy",
  },
  {
    image: "/assets/featured_properties/shore.png",
    name: "Turf Residences",
    location: "Binan, Laguna",
    price: "₱2,500,000 - ₱3,500,000",
    status: "Preselling",
  },
  {
    image: "/assets/featured_properties/shore.png",
    name: "Shore Residences",
    location: "Mall of Asia, Pasay City",
    price: "₱6,500,000 - ₱24,800,000",
    status: "Ready for Occupancy",
  },
  {
    image: "/assets/featured_properties/park.png",
    name: "Bloom Residences",
    location: "Sucat, Paranaque",
    price: "₱4,000,000 - ₱6,600,000",
    status: "Ready for Occupancy",
  },
  {
    image: "/assets/featured_properties/shore.png",
    name: "Parkville",
    location: "Bacolod City",
    price: "₱2,700,000 - ₱4,300,000",
    status: "Ready for Occupancy",
  },
  {
    image: "/assets/featured_properties/bloom.png",
    name: "Turf Residences",
    location: "Binan, Laguna",
    price: "₱2,500,000 - ₱3,500,000",
    status: "Preselling",
  },
];

const FeaturedProperties: React.FC = () => {
  // Slider settings
  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "120px",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 500, // Mobile View
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 960, // Tablet View
        settings: {
          slidesToShow: 3,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 1200, // Web View
        settings: {
        slidesToShow: 3,
        },
      },
    ],
  };

  // function FeaturedProperties() {

  return (
    <>
      <section className="fproperties-cont">
        {/* <div className="title-controls"> */}
        <div className="title-cont">
          <h1>Featured Investment Oppurtunities</h1>
          <p>
            Explore top-tier properties handpicked for high returns and
            long-term value. Find the perfect investment today!
          </p>
        </div>
        {/* </div> */}

        <div className="properties-slider-cont">
          <Slider {...settings}>
            {properties.map((property, index) => (
              <div key={index} className="property-card">
                <div className="property-image">
                  <img
                    src={import.meta.env.BASE_URL + property.image}
                    alt={property.name}
                    className="property-image"
                  />
                  <p
                    className={`status ${
                      property.status === "Ready for Occupancy"
                        ? "ready"
                        : "preselling"
                    }`}
                  >
                    {property.status}
                  </p>
                </div>
                <div className="property-details">
                  <h3>{property.name}</h3>
                  <p>
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 16.3125C12.3125 12.375 14.5625 9 14.5625 6.75C14.5625 5.40734 14.0291 4.11967 13.0797 3.17027C12.1303 2.22087 10.8427 1.6875 9.5 1.6875C8.15734 1.6875 6.86967 2.22087 5.92027 3.17027C4.97087 4.11967 4.4375 5.40734 4.4375 6.75C4.4375 9 6.6875 12.375 9.5 16.3125Z"
                        stroke="#1A3D8F"
                      />
                      <path
                        d="M11.75 6.75C11.75 7.34674 11.5129 7.91903 11.091 8.34099C10.669 8.76295 10.0967 9 9.5 9C8.90326 9 8.33097 8.76295 7.90901 8.34099C7.48705 7.91903 7.25 7.34674 7.25 6.75C7.25 6.15326 7.48705 5.58097 7.90901 5.15901C8.33097 4.73705 8.90326 4.5 9.5 4.5C10.0967 4.5 10.669 4.73705 11.091 5.15901C11.5129 5.58097 11.75 6.15326 11.75 6.75Z"
                        stroke="#1A3D8F"
                      />
                    </svg>

                    {property.location}
                  </p>
                  <p>
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.3994 3.1501H5.89941V1.3501H10.3994C11.5929 1.3501 12.7375 1.8242 13.5814 2.66812C14.4253 3.51203 14.8994 4.65662 14.8994 5.8501V6.7501C14.8994 7.94357 14.4253 9.08816 13.5814 9.93208C12.7375 10.776 11.5929 11.2501 10.3994 11.2501H5.89941V9.4501H10.3994C11.1155 9.4501 11.8023 9.16563 12.3086 8.65929C12.815 8.15294 13.0994 7.46618 13.0994 6.7501V5.8501C13.0994 5.13401 12.815 4.44726 12.3086 3.94091C11.8023 3.43456 11.1155 3.1501 10.3994 3.1501Z"
                        fill="#1A3D8F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.9 1.3501C6.13869 1.3501 6.36761 1.44492 6.5364 1.6137C6.70518 1.78248 6.8 2.0114 6.8 2.2501V16.2001C6.8 16.4388 6.70518 16.6677 6.5364 16.8365C6.36761 17.0053 6.13869 17.1001 5.9 17.1001C5.66131 17.1001 5.43239 17.0053 5.2636 16.8365C5.09482 16.6677 5 16.4388 5 16.2001V2.2501C5 2.0114 5.09482 1.78248 5.2636 1.6137C5.43239 1.44492 5.66131 1.3501 5.9 1.3501Z"
                        fill="#1A3D8F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.2998 4.89268C2.2998 4.65398 2.39463 4.42506 2.56341 4.25628C2.73219 4.0875 2.96111 3.99268 3.1998 3.99268H15.7998C16.0385 3.99268 16.2674 4.0875 16.4362 4.25628C16.605 4.42506 16.6998 4.65398 16.6998 4.89268C16.6998 5.13137 16.605 5.36029 16.4362 5.52907C16.2674 5.69786 16.0385 5.79268 15.7998 5.79268H3.1998C2.96111 5.79268 2.73219 5.69786 2.56341 5.52907C2.39463 5.36029 2.2998 5.13137 2.2998 4.89268ZM2.2998 7.59268C2.2998 7.35398 2.39463 7.12506 2.56341 6.95628C2.73219 6.7875 2.96111 6.69268 3.1998 6.69268H15.7998C16.0385 6.69268 16.2674 6.7875 16.4362 6.95628C16.605 7.12506 16.6998 7.35398 16.6998 7.59268C16.6998 7.83137 16.605 8.06029 16.4362 8.22907C16.2674 8.39785 16.0385 8.49268 15.7998 8.49268H3.1998C2.96111 8.49268 2.73219 8.39785 2.56341 8.22907C2.39463 8.06029 2.2998 7.83137 2.2998 7.59268Z"
                        fill="#1A3D8F"
                      />
                    </svg>

                    {property.price}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

// Arrow Components
const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div className="left-arrow" onClick={onClick}>
    <svg
      width="44"
      height="33"
      viewBox="0 0 44 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M42 18.375C42.4973 18.375 42.9742 18.1775 43.3258 17.8258C43.6775 17.4742 43.875 16.9973 43.875 16.5C43.875 16.0027 43.6775 15.5258 43.3258 15.1742C42.9742 14.8225 42.4973 14.625 42 14.625V18.375ZM42 14.625H2V18.375H42V14.625Z"
        fill="#E1A000"
      />
      <path
        d="M17 1.5L2 16.5L17 31.5"
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
      width="44"
      height="33"
      viewBox="0 0 44 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M2 14.625C1.50272 14.625 1.0258 14.8225 0.674171 15.1742C0.322544 15.5258 0.125 16.0027 0.125 16.5C0.125 16.9973 0.322544 17.4742 0.674171 17.8258C1.0258 18.1775 1.50272 18.375 2 18.375V14.625ZM2 18.375L42 18.375V14.625L2 14.625V18.375Z"
        fill="#E1A000"
      />
      <path
        d="M27 31.5L42 16.5L27 1.5"
        stroke="#E1A000"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
);

export default FeaturedProperties;

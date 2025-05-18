import React, { useState } from "react";
import Slider from "react-slick"; // Install react-slick and slick-carousel
import ".././App.css";
import ".././css/ImageGallery.css"; // Adjust the path as necessary;

interface GalleryModalProps {
  images: string[];
}

const ImageGallery: React.FC<GalleryModalProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* Desktop View */}
      <div className="preview-cont">
        {images.slice(0, 5).map((image, index) => (
          <div
            className="preview-thumbnail"
            key={index}
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL + image})`,
            }}
          >
            {index === 4 && (
              <div className="overlay">
                <button
                  className="view-more-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                    setCurrentIndex(4);
                  }}
                >
                  View All Photos
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tablet View */}
      <div className="tablet-slider">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="slider-image">
              <img
                src={`${import.meta.env.BASE_URL + image}`}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
        <button
          className="view-all-btn"
          onClick={() => {
            setIsModalOpen(true);
            setCurrentIndex(0);
          }}
        >
          View All
        </button>
      </div>

      {isModalOpen && (
        <div className="gallery-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="gallery-modal"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.99999 8.40078L2.09999 13.3008C1.91665 13.4841 1.68332 13.5758 1.39999 13.5758C1.11665 13.5758 0.883321 13.4841 0.699987 13.3008C0.516654 13.1174 0.424988 12.8841 0.424988 12.6008C0.424988 12.3174 0.516654 12.0841 0.699987 11.9008L5.59999 7.00078L0.699987 2.10078C0.516654 1.91745 0.424988 1.68411 0.424988 1.40078C0.424988 1.11745 0.516654 0.884114 0.699987 0.700781C0.883321 0.517448 1.11665 0.425781 1.39999 0.425781C1.68332 0.425781 1.91665 0.517448 2.09999 0.700781L6.99999 5.60078L11.9 0.700781C12.0833 0.517448 12.3167 0.425781 12.6 0.425781C12.8833 0.425781 13.1167 0.517448 13.3 0.700781C13.4833 0.884114 13.575 1.11745 13.575 1.40078C13.575 1.68411 13.4833 1.91745 13.3 2.10078L8.39999 7.00078L13.3 11.9008C13.4833 12.0841 13.575 12.3174 13.575 12.6008C13.575 12.8841 13.4833 13.1174 13.3 13.3008C13.1167 13.4841 12.8833 13.5758 12.6 13.5758C12.3167 13.5758 12.0833 13.4841 11.9 13.3008L6.99999 8.40078Z" fill="#343434"/>
              </svg>
            </button>
            <h2>Sail Residences Gallery</h2>
            <div className="gallery-content">
              <div className="main-image">
              <button className="arrow left-arrow" onClick={handlePrev}>
                <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 16L16 1M1 16L16 31M1 16H27.25M41 16H34.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
                <img
                  src={`${import.meta.env.BASE_URL + images[currentIndex]}`}
                  alt={`Slide ${currentIndex + 1}`}
                />
              <button className="arrow right-arrow" onClick={handleNext}>
                <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M41 16L26 31M41 16L26 1M41 16L14.75 16M1 16L7.25 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              </div>
              <div className="thumbnails">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.BASE_URL + image}`}
                    alt={`Thumbnail ${index + 1}`}
                    className={index === currentIndex ? "active" : ""}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;

import React, { useState } from "react";
import Slider from "react-slick";
import ".././App.css";
import ".././css/ImageGallery.css";

interface GalleryModalProps {
  images: string[];
  propertyName?: string;
}

const ImageGallery: React.FC<GalleryModalProps> = ({ images, propertyName = "Property" }) => {
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
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Helper: check if image is an absolute URL
  const getImageSrc = (image: string) => {
    if (!image) return "";
    if (/^https?:\/\//.test(image)) return image;
    return import.meta.env.BASE_URL + image;
  };

  const handleOpenModal = (index: number) => {
    // Ensure index is within valid range
    const validIndex = Math.min(Math.max(0, index), images.length - 1);
    setCurrentIndex(validIndex);
    setIsModalOpen(true);
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
              backgroundImage: `url(${getImageSrc(image)})`,
            }}
            onClick={() => handleOpenModal(index)}
          >
            {index === 4 && images.length > 5 && (
              <div className="overlay">
                <button
                  className="view-more-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // This prevents triggering the parent div's click event
                    handleOpenModal(4); // This correctly opens the modal with the 5th image
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
                src={getImageSrc(image)}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
        <button
          className="view-all-btn"
          onClick={() => handleOpenModal(0)}
        >
          View All
        </button>
      </div>

      {isModalOpen && images.length > 0 && (
        <div className="gallery-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="gallery-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.99999 8.40078L2.09999 13.3008C1.91665 13.4841 1.68332 13.5758 1.39999 13.5758C1.11665 13.5758 0.883321 13.4841 0.699987 13.3008C0.516654 13.1174 0.424988 12.8841 0.424988 12.6008C0.424988 12.3174 0.516654 12.0841 0.699987 11.9008L5.59999 7.00078L0.699987 2.10078C0.516654 1.91745 0.424988 1.68411 0.424988 1.40078C0.424988 1.11745 0.516654 0.884114 0.699987 0.700781C0.883321 0.517448 1.11665 0.425781 1.39999 0.425781C1.68332 0.425781 1.91665 0.517448 2.09999 0.700781L6.99999 5.60078L11.9 0.700781C12.0833 0.517448 12.3167 0.425781 12.6 0.425781C12.8833 0.425781 13.1167 0.517448 13.3 0.700781C13.4833 0.884114 13.575 1.11745 13.575 1.40078C13.575 1.68411 13.4833 1.91745 13.3 2.10078L8.39999 7.00078L13.3 11.9008C13.4833 12.0841 13.575 12.3174 13.575 12.6008C13.575 12.8841 13.4833 13.1174 13.3 13.3008C13.1167 13.4841 12.8833 13.5758 12.6 13.5758C12.3167 13.5758 12.0833 13.4841 11.9 13.3008L6.99999 8.40078Z" fill="#343434"/>
              </svg>
            </button>
            <h2>{propertyName} Gallery</h2>
            <div className="gallery-content">
              <div className="main-image">
                <button className="arrow left-arrow" onClick={handlePrev}>
                  <svg width="44" height="33" viewBox="0 0 44 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M42 18.375C42.4973 18.375 42.9742 18.1775 43.3258 17.8258C43.6775 17.4742 43.875 16.9973 43.875 16.5C43.875 16.0027 43.6775 15.5258 43.3258 15.1742C42.9742 14.8225 42.4973 14.625 42 14.625V18.375ZM42 14.625H2V18.375H42V14.625Z" fill="white"/>
                    <path d="M17 1.5L2 16.5L17 31.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {images[currentIndex] && (
                  <img
                    src={getImageSrc(images[currentIndex])}
                    alt={`Slide ${currentIndex + 1}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = import.meta.env.BASE_URL + '/assets/unit-type/placeholder.png';
                    }}
                  />
                )}
                <button className="arrow right-arrow" onClick={handleNext}>
                  <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M2 15.125C1.50272 15.125 1.0258 15.3225 0.674171 15.6742C0.322544 16.0258 0.125 16.5027 0.125 17C0.125 17.4973 0.322544 17.9742 0.674171 18.3258C1.0258 18.6775 1.50272 18.875 2 18.875V15.125ZM2 18.875L42 18.875V15.125L2 15.125V18.875Z" fill="white"/>
                    <path d="M27 32L42 17L27 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="thumbnails">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={getImageSrc(image)}
                    alt={`Thumbnail ${index + 1}`}
                    className={index === currentIndex ? "active" : ""}
                    onClick={() => handleThumbnailClick(index)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = import.meta.env.BASE_URL + '/assets/unit-type/placeholder.png';
                    }}
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

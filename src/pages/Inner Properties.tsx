import React from "react";
import Hero from "../sections/InnerProperties_Hero";
import ImageGallery from "../components/ImageGallery";
import AmenitiesList from "../components/AmenitiesList";
import UnitType from "../sections/UnitType";
import NearbyEstablishments from "../sections/NearbyEstablishments";
import FAQs from "../sections/Faqs";
import FeaturedProp from "../sections/FeaturedProperties";
import ".././App.css";

const images = [
  "/assets/gallery/bloom.png",
  "/assets/gallery/park.png",
  "/assets/gallery/bloom.png",
  "/assets/gallery/park.png",
  "/assets/gallery/bloom.png",
  "/assets/gallery/park.png",
  "/assets/gallery/bloom.png",
  "/assets/gallery/park.png",
  "/assets/gallery/bloom.png",
];

const amenities = [
  { label: "Lap Pool" },
  { label: "Kiddie Pool" },
  { label: "Fitness Gym" },
  { label: "Sunset Lounge" },
  { label: "Grand Lobby" },
  { label: "Sunset Lanai" },
  { label: "Celebration Hall" },
];

function InnerProperties() {
  return (
    <>
      <div className="inner-properties-pg">
        <Hero />
        <ImageGallery images={images} />
        <AmenitiesList amenities={amenities} />
        <UnitType />
        <NearbyEstablishments />
        <FAQs />
        <FeaturedProp />
      </div>
    </>
  );
}

export default InnerProperties;

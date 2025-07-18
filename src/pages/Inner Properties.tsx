import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase";
import Crumbs from '../components/Crumbs' 
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
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [unitsTable, setUnitsTable] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (!id) return;
    const propertyRef = ref(rtdb, `properties/${id}`);
    const unsubscribe = onValue(propertyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProperty(data);
      }
    });
    return () => unsubscribe();
  }, [id]);

  // Fetch units table from Firebase (global, not per property)
  useEffect(() => {
    const unitsRef = ref(rtdb, "units");
    const unsubscribe = onValue(unitsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUnitsTable(data);
      }
    });
    return () => unsubscribe();
  }, []);

  // Prepare units for this property
  let propertyUnits: Array<{ name: string; area: number; price: number; image: string }> = [];
  if (property && property.unit && unitsTable && Object.keys(unitsTable).length > 0) {
    propertyUnits = Object.keys(property.unit)
      .filter(key => property.unit[key] && unitsTable[key])
      .map(key => ({
        name: unitsTable[key].name,
        area: unitsTable[key].area,
        price: unitsTable[key].price,
        // Use previous images if available, fallback to placeholder
        image:
          unitsTable[key].image ||
          (unitsTable[key].name === "Aria"
            ? "https://firebasestorage.googleapis.com/v0/b/dmdc-freelance.firebasestorage.app/o/properties%2Fpark.png?alt=media&token=79495b40-b674-4ce7-b9c7-4eb2aaee041c"
            : unitsTable[key].name === "Sonata"
            ? "https://firebasestorage.googleapis.com/v0/b/dmdc-freelance.firebasestorage.app/o/properties%2Fshore.png?alt=media&token=0b199c00-af9b-4a0c-881f-6bd60decbcad"
            : unitsTable[key].name === "Anne House Model"
            ? "/assets/unit-type/unit3.jpg"
            : unitsTable[key].name === "Annika House Model"
            ? "/assets/unit-type/unit3.jpg"
            : "/assets/unit-type/placeholder.png"),
      }));
  }

  const propertyName = property?.name || "Property";
  const location = property?.location || "";
  // Compute price range from unit prices using global unitsTable (like PropertiesBody)
  let priceRange = "";
  if (property && property.unit && unitsTable && Object.keys(unitsTable).length > 0) {
    const prices = Object.keys(property.unit)
      .filter(key => property.unit[key] && unitsTable[key] && typeof unitsTable[key].price === 'number')
      .map(key => unitsTable[key].price);
    if (prices.length > 0) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      priceRange = min === max ? `₱${min.toLocaleString()}` : `₱${min.toLocaleString()} - ₱${max.toLocaleString()}`;
    }
  }
  const description = property?.description || "";

  return (
    <>
      <div className="inner-properties-pg">
        <Crumbs pageName={propertyName} />
        <Hero
          name={propertyName}
          location={location}
          priceRange={priceRange}
          description={description}
          virtualtour_link={property?.virtualtour_link}
          image={property?.images?.mainImage}
        />
        <ImageGallery images={images} />
        <AmenitiesList amenities={amenities} />
        <UnitType units={propertyUnits} />
        <NearbyEstablishments />
        <FAQs />
        <FeaturedProp />
      </div>
    </>
  );
}

export default InnerProperties;

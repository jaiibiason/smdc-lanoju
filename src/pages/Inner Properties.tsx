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

function InnerProperties() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [unitsTable, setUnitsTable] = useState<{ [key: string]: any }>({});
  const [amenitiesTable, setAmenitiesTable] = useState<{ [key: string]: any }>({});
  const [nearbyestTable, setNearbyestTable] = useState<{ [key: string]: any }>({});

  // Scroll to top when component mounts or when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  // Fetch amenities table from Firebase
  useEffect(() => {
    const amenitiesRef = ref(rtdb, "amenities");
    const unsubscribe = onValue(amenitiesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAmenitiesTable(data);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch nearby establishments table from Firebase
  useEffect(() => {
    const nearbyestRef = ref(rtdb, "nearbyest");
    const unsubscribe = onValue(nearbyestRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNearbyestTable(data);
      }
    });
    return () => unsubscribe();
  }, []);

  // Prepare units for this property
  let propertyUnits: Array<{ name: string; area: number; price: number; image: string }> = [];
  
  if (property && property.unit && unitsTable && Object.keys(unitsTable).length > 0) {
    // Get unit data from property.unit and combine with global units table
    propertyUnits = Object.entries(property.unit)
      .map(([unitKey, unitData]: [string, any]) => {
        // Get the unit name from the global units table
        const unitName = unitsTable[unitKey]?.name || "Unnamed Unit";
        
        // Use unit data from property (it contains price and area)
        return {
          name: unitName,
          area: unitData.area || 0,
          price: unitData.price || 0,
          image: unitData.unit_image_url && unitData.unit_image_url.trim() !== ""
            ? unitData.unit_image_url
            : "/assets/unit-type/placeholder.png"
        };
      })
      .filter(unit => unit.price > 0); // Only include units with valid price
  }

  // Prepare amenities for this property
  let propertyAmenities: Array<{ label: string; icon: string }> = [];
  
  if (property && property.amenities && amenitiesTable) {
    // Get amenities from property that are marked as true
    propertyAmenities = Object.keys(property.amenities)
      .filter(key => property.amenities[key] === true && amenitiesTable[key])
      .map(key => ({
        label: amenitiesTable[key].name,
        icon: amenitiesTable[key].icon_link && amenitiesTable[key].icon_link.trim() !== ""
          ? amenitiesTable[key].icon_link
          : "https://firebasestorage.googleapis.com/v0/b/dmdc-freelance.firebasestorage.app/o/amenities_icons%2Fdefault-icon.svg?alt=media&token=57e0af54-c470-4f03-850f-e7f26c50f016"
      }));
  }

  // Calculate price range from unit prices
  let priceRange = "";
  if (propertyUnits.length > 0) {
    const prices = propertyUnits.map(unit => unit.price).filter(price => price > 0);
    if (prices.length > 0) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      priceRange = min === max ? `₱${min.toLocaleString()}` : `₱${min.toLocaleString()} - ₱${max.toLocaleString()}`;
    }
  }

  // Prepare gallery images from property.images (all keys except mainImage)
  let galleryImages: string[] = [];
  if (property && property.images) {
    galleryImages = Object.entries(property.images)
      .filter(([key]) => key !== "mainImage")
      .map(([_, url]) => String(url))
      .filter((url) => typeof url === "string" && url.trim() !== "");
  }

  // Add unit images to gallery if available
  if (property && property.unit) {
    Object.values(property.unit).forEach((unit: any) => {
      if (unit.unit_image_url && typeof unit.unit_image_url === "string" && unit.unit_image_url.trim() !== "") {
        
          galleryImages.push(unit.unit_image_url);
        
      }
    });
  }

  return (
    <>
      <div className="inner-properties-pg">
        <Crumbs pageName={property?.name || "Property"} />
        <Hero
          name={property?.name || ""}
          location={property?.location || ""}
          priceRange={priceRange}
          description={property?.description || ""}
          virtualtour_link={property?.virtualtour_link}
          image={property?.images?.mainImage}
          property_specifics={property?.property_specifics}
          promotional_highlight={property?.promotional_highlight}
          financing_options={property?.financing_options}
        />
        <ImageGallery 
          images={galleryImages} 
          propertyName={property?.name || "Property"}
        />
        <AmenitiesList amenities={propertyAmenities} />
        <UnitType units={propertyUnits} />
        <NearbyEstablishments 
          property={property}
          nearbyestTable={nearbyestTable}
        />
        <FAQs />
        <FeaturedProp />
      </div>
    </>
  );
}

export default InnerProperties;

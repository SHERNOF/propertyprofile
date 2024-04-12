"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/Requests";

const PropertyPage = () => {
  const [property, setproperty] = useState(null);
  const [loading, setloading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = fetchProperty(id);
        setproperty(property);
      } catch (error) {
        console.error("Error fetvhing property", error);
      } finally {
        setloading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);
  return <div>Property Pages</div>;
};

export default PropertyPage;

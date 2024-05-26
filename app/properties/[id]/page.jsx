"use client";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
// import PropertyInfo from "@/components/1PropertyInfo";
import PropertyDetails from "@/components/PropertyDetails";
import { fetchProperty } from "@/utils/Requests";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyImages from "@/components/PropertyImages";
import { PropertyContactForm } from "@/components/PropertyContactForm";

// async function fetchProperty() {
//   try {
//     // handle the domain if not yet available
//     if (!apiDomain) {
//       return [];
//     }
//     const res = await fetch(`${apiDomain}/properties`);
//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     return res.json();
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setproperty] = useState(null);
  const [loading, setloading] = useState(true);
  // console.log("The Property is: ", property);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setproperty(property);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setloading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
      // console.log(property);
    }
  }, [id, property]);
  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <>
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href={"/properties"}
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowAltCircleLeft /> Back to Properties
              </Link>
            </div>
          </section>
          <PropertyDetails property={property} />
          <PropertyImages images={property.images} />
          <PropertyContactForm property={property}/>
        </>
      )}
    </>
  );
};

export default PropertyPage;

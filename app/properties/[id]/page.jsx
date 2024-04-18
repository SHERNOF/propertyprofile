import React from "react";

async function fetchProperty() {
  try {
      // handle the domain if not yet available
      if(!apiDomain){
          return []
      }
    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return []
  }
}


const PropertyPage = ({property}) => {
  console.log('The Property is: ', property)
  return <div>Property Page</div>;
};

export default PropertyPage;

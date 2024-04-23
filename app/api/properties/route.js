import Property from "@/models/Property";
import connectDb from "@/config/db";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDb();
    const properties = await Property.find({});
    //localhost:3000
    http: return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const formData = await request.formData()

    // access all values from amenities
    const amenities = formData.getAll('amenities')
    const images = formData.getAll('images').filter((image)=> image.name !== '')
    
    // create propertyData object for database
    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds:formData.get('beds'),
      baths:formData.get('baths'),
      square_feet:formData.get('square_feet'),
      amenities,
      rates: {
        nightly:formData.get('nightly'),
        weekly:formData.get('weekly'),
        monthly:formData.get('monthly'),
      },
      seller_info:  {
        name:formData.get('seller_info.name'),
        email:formData.get('seller_info.email'),
        phone:formData.get('seller_info.phone'),
      },
      images
    }

    return new Response(JSON.stringify({message: 'Success'}), { status: 200})
  } catch (error) {
    return new Response('Failed to add property', { status: 500 })
    
  }
}

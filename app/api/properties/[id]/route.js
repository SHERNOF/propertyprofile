import connectDb from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { Db } from "mongodb";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDb();
    const property = await Property.findById(params.id);
    if (!property) return new Response("Propeerty not Found", { status: 404 });
    return new Response(JSON.stringify(property), {
      status: 200,
    });
    
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id
    const sessionUser = await getSessionUser()
    if(!sessionUser || !sessionUser.userId){
      return new Response('User ID is required', { status: 401} )
    }
    const { userId } = sessionUser
  
    await connectDb();
    const property = await Property.findById(params.id);
    if (!property) return new Response("Propeerty not Found", { status: 404 });
    // Verify ownership
    if(property.owner.toString() === !userId ){
      return new Response('Unathorized', { status: 401 })
    }
    // if there's a user
    await property.deleteOne()
    return new Response('Property Deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
// PUT request for /api/properties/:id
export const PUT = async (request, {params}) => {
  console.log(params)
  try {
    await connectDb();
    // const session = await getServerSession(authOptions);

    // use the getUserSession

    // if (!session) {
    //   return new Response("Unauthorized", { status: 401 });
    // }
    // const userId = session.user.id;
    
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id } = params
    const { userId } = sessionUser;
    console.log(sessionUser.userId);

    const formData = await request.formData();

    // access all values from amenities
    const amenities = formData.getAll("amenities");

    // GET property data
    const existingProperty = await Property.findById(id)
    if(!existingProperty){
      return new Response('Property does not exist', { status: 404 })
    }
    // verify ownership
    if(existingProperty.owner.toString() !== userId){
      return new Response('Unauthorized', { status: 401 })
    }


    // const images = formData
    //   .getAll("images")
    //   .filter((image) => image.name !== "");

    // create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
      // images,
    };
    // upload images to cloudinary

    // const imagesUploadPromises = [];
    // for (const image of images) {
    //   const imageBuffer = await image.arrayBuffer();
    //   const imageArray = Array.from(new Uint8Array(imageBuffer));
    //   const imageData = Buffer.from(imageArray);

    //   // convert imageData to Base 64
    //   const imageBase64 = imageData.toString("base64");

    //   // make request to upload to cloudinary
    //   const result = await cloudinary.uploader.upload(
    //     `data:image/png;base64,${imageBase64}`,
    //     { folder: "propertypulse" }
    //   );
    //   imagesUploadPromises.push(result.secure_url);
    //   // wait for all images to upload
    //   const uploadedImages = await Promise.all(imagesUploadPromises);
    //   // add uploaded images to propertyData object
    //   propertyData.images = uploadedImages;
    // }

    // console.log(propertyData);
    // return new Response(JSON.stringify({ message: "Success" }), {
    //   status: 200,
    // });



    // const newProperty = new Property(propertyData);
    // await newProperty.save();

    // update property in Db
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)
   return Response(JSON.stringify(updatedProperty), {status : 200});  
  } catch (error) {
    return new Response("Failed to add property", { status: 500 });
  }
};
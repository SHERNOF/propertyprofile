import connectDb from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

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

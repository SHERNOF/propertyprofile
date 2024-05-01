import Property from "@/models/Property";
import connectDb from "@/config/db";

// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
    try {
      await connectDb();
      const userId = params.userId
      if(!userId){
        return new Response('User ID is required', {status: 400 })
      }
      const properties = await Property.find({owner: userId});
      //localhost:3000
      http: return new Response(JSON.stringify(properties), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response("Something went wrong", { status: 500 });
    }
  };
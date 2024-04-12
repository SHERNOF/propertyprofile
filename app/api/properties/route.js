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

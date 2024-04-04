import connectDb from "@/config/db";
export const GET = async (request) => {
  try {
    await connectDb();

    return new Response(JSON.stringify({ message: "Hello World" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

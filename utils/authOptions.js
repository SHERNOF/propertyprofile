import connectDb from "@/config/db";
import User from "@/models/User";

import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //   invoked on succewssful signin
    async signIn({ profile }) {
      // 1. connect to db
      await connectDb();
      // 2. check if the user exist
      const userExist = await User.findOne({ email: profile.email });
      // 3. if not then ssve user to db
      if (!userExist) {
        // truncate username if too long
        const username = profile.name.slice(0, 12);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return true to allow to signin
      return true;
    },
    // Modify the session object
    async session({ session }) {
      // 1. get user from db
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign the user id to session
      session.iser.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};

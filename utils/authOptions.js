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
      // 2. check if the user exist
      // 3. if not then ssve user to db
      // 4. return true to allow to signin
    },
    // Modify the session object
    async session({ session }) {
      // 1. get user from db
      // 2. Assign the user id to session
      // 3. return session
    },
  },
};

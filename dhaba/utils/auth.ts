import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      //   clientId: process.env.GOOGLE_ID!,
      //   clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
};

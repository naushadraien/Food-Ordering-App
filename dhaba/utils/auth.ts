import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma_connect_for_api";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      //   clientId: process.env.GOOGLE_ID!,
      //   clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
};

//we can use the useSession in the server component also but we have to use the getSession in the server component as given below
export const getAuthSession = () => getServerSession(authOptions);

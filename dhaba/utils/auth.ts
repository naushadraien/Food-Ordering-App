import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma_connect_for_api";

declare module "next-auth" {
  //this is for declaring the types for the session object and the type for isAdmin
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}

declare module "next-auth/jwt" {
  //this is for declaring the types for the session object and the type for isAdmin
  interface JWT {
    isAdmin: Boolean;
  }
}

export const authOptions: NextAuthOptions = {
  // we also declare the types for the jwt token
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      //   clientId: process.env.GOOGLE_ID!,
      //   clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.isAdmin = token.isAdmin; // we can add more properties to the session object and here we only add isAdmin property to the session for checking the admin
      }
      return session;
    },
    async jwt({ token }) {
      const userInDB = await prisma.user.findUnique({
        where: {
          email: token.email as string,
        },
      });
      token.isAdmin = userInDB?.isAdmin as boolean;
      return token;
    },
  },
};

//we can use the useSession in the server component also but we have to use the getSession in the server component as given below
export const getAuthSession = () => getServerSession(authOptions);

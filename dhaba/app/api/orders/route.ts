import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prisma_connect_for_api";
import { NextRequest, NextResponse } from "next/server";

//Fetching all orders from database
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany(); //if the user is the admin then show all the orders
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email as string,
        },
      }); //if the user is the admin then show all the orders
      // console.log("orders" + orders);
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something Went Wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};

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
      }); //if the user is not the admin find the order of the user by email
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

//order creation for the user payment for products
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    try {
      const body = await req.json();
      if (session.user) {
        const PaymentOrder = await prisma.order.create({
          data: body,
        }); //if the user is the admin then show all the orders
        return new NextResponse(JSON.stringify(PaymentOrder), { status: 201 });
      }
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

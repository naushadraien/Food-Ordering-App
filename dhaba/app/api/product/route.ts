import prisma from "@/utils/prisma_connect_for_api";
import { NextRequest, NextResponse } from "next/server";

//Fetching all products from database
export const GET = async (req: NextRequest) => {
  try {
    const products = await prisma.product.findMany({});
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something Went Wrong!" }),
      { status: 500 }
    );
  }
};

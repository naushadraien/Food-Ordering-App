import prisma from "@/utils/prisma_connect_for_api";
import { NextResponse } from "next/server";

//Fetching all categories from database
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something Went Wrong!" }),
      { status: 500 }
    );
  }
};

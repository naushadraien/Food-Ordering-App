import prisma from "@/utils/prisma_connect_for_api";
import { NextRequest, NextResponse } from "next/server";

//Fetching all products from database
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat"); // http://localhost:3000/api/products?cat="pizza"  here pizza is the search params and using this we are filtering the products
  //   console.log("cat", cat);

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }), // if cat is present then filter by cat else filter by isFeatured
      },
    });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something Went Wrong!" }),
      { status: 500 }
    );
  }
};

//posting products from frontend to database
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const products = await prisma.product.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(products), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something Went Wrong!" }),
      { status: 500 }
    );
  }
};

import prisma from "@/utils/prisma_connect_for_api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    // const body = await req.json();
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    // console.log(body);

    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something Went Wrong!" }),
      { status: 500 }
    );
  }
};

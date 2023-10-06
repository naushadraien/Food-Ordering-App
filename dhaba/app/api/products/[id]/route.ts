import { getAuthSession } from "@/utils/auth";
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const session = await getAuthSession(); //for getting the session of the admin in the server side if the admin is logged in then we will get the session otherwise we will get null
  if (session?.user.isAdmin) {
    try {
      await prisma.product.delete({
        where: {
          id: id,
        },
      });
      return new NextResponse(
        JSON.stringify({ message: "Product has been deleted successfully!" }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something Went Wrong!" }),
        { status: 500 }
      );
    }
  }
  return new NextResponse(JSON.stringify({ message: "Unauthorized!" }), {
    status: 403,
  });
};

import prisma from "@/utils/prisma_connect_for_api";
import { NextResponse, NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { OrderId: string } }
) => {
  const { OrderId } = params;

  // console.log("OrderId from confirm-payment-intent", OrderId);

  try {
    await prisma.order.update({
      where: {
        id: OrderId,
      },
      data: { status: "Being prepared!" },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

import { EmailTemplate } from "@/components/email-template";
import prisma from "@/utils/prisma_connect_for_api";
import { NextRequest, NextResponse } from "next/server";
import * as React from "react";
import { Resend } from "resend";

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

export async function POST(
  req: NextRequest,
  { params }: { params: { OrderId: string } }
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { OrderId } = params;
  try {
    const orderedProduct = await prisma.order.findFirst({
      where: {
        id: OrderId,
      },
    });
    const { data, error } = await resend.emails.send({
      from: "FeastFlix <onboarding@resend.dev>",
      to: [orderedProduct?.userEmail || "rehankhan426344@gmail.com"], // Provide a default value for orderedProduct?.userEmail
      subject: "Order Confirmed",
      react: EmailTemplate({
        ProductName: (orderedProduct?.products[0] as { title: string })?.title, // Add a type assertion to ensure the correct type
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}

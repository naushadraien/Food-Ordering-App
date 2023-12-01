import prisma from "@/utils/prisma_connect_for_api";
import { NextRequest, NextResponse } from "next/server";

// console.log(process.env.STRIPE_SECRET_KEY);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100 * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });
    // console.log(paymentIntent.id);

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  }
  return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
    status: 404,
  });
}

import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
 
export async function PATCH(
  req: Request,
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { basePrice, distancePrice } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!basePrice) {
      return new NextResponse("Base price is required", { status: 400 });
    }

    if (!distancePrice) {
      return new NextResponse("Distance price is required", { status: 400 });
    }

    const prices = await prismadb.prices.update({
      where: {
        id: 1,
      },
      data: {
        basePrice,
        distancePrice
      },
    });

    return NextResponse.json(prices.id);
  } catch (error) {
    console.log("[PRICE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
import { env } from "@/env";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const body = await request.json();

    const { type } = body;

    if (type === "checkout.session.completed") {
      const { plan, userId } = body.data.object.metadata;
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          trialClaimed: true,
          plan:
            plan === env.STRIPE_PRICE_ID_SOLO_PLAN
              ? "solo"
              : plan === env.STRIPE_PRICE_ID_FREELANCE_PLAN
                ? "freelancer"
                : "agency",
        },
      });
      return NextResponse.json(
        {
          msg: `Settings updated successfully.`,
        },
        {
          status: 201,
        },
      );
    }
    if (type === "customer.subscription.updated") {
      const { customer, plan, status } = body.data.object;
      await db.user.updateMany({
        where: {
          stripeCustomerId: customer,
        },
        data: {
          trialClaimed: status === "trialing" ? true : false,
          plan:
            plan === env.STRIPE_PRICE_ID_SOLO_PLAN
              ? "solo"
              : plan === env.STRIPE_PRICE_ID_FREELANCE_PLAN
                ? "freelancer"
                : "agency",
        },
      });
      return NextResponse.json(
        {
          msg: `Settings updated successfully.`,
        },
        {
          status: 201,
        },
      );
    }

    const session = await auth();

    const user = await db.user.findFirst({
      where: {
        id: session?.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          msg: `User not found.`,
        },
        {
          status: 404,
        },
      );
    }

    // update user
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        trialClaimed: true,
      },
    });

    return NextResponse.json(
      {
        msg: `Settings updated successfully.`,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: `Something went wrong, please try again.`,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request: NextRequest, res: NextResponse) {
  return NextResponse.json(
    {
      msg: `Webhook route.`,
    },
    {
      status: 200,
    },
  );
}

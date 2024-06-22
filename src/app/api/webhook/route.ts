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
          plan: plan,
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

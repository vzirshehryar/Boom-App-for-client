import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { trialClaimed } = body;
    if (!trialClaimed) {
      return NextResponse.json(
        {
          msg: `Errror.`,
        },
        {
          status: 404,
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

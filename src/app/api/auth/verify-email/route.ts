import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    console.log("token is " + token);

    const user = await db.userToken.findFirst({
      where: {
        token: token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          msg: `Token expired.`,
        },
        {
          status: 400,
        },
      );
    }

    const data = await db.userToken.updateMany({
      where: {
        token: token,
        expires: {
          gt: new Date(),
        },
      },
      data: {
        type: "",
        token: "",
      },
    });
    console.log("data is : ", data);

    await db.user.update({
      where: {
        id: user.userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(
      {
        msg: `Email verified successfull. Redirecting...`,
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

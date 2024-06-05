import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          msg: `Id is required.`,
        },
        {
          status: 400,
        },
      );
    }

    const history = await db.history.findFirst({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(
      {
        msg: `Got History`,
        data: history,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: `Something went wrong.`,
      },
      {
        status: 500,
      },
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          msg: `Id is required.`,
        },
        {
          status: 400,
        },
      );
    }

    // Delete history
    await db.history.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(
      {
        msg: `History deleted Successfully`,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: `Something went wrong.`,
      },
      {
        status: 500,
      },
    );
  }
}

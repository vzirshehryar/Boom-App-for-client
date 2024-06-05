import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { websiteName,websiteLink, username, password } = body;

    if (!websiteName || !websiteLink || !username || !password) {
      return NextResponse.json(
        {
          msg: `Please fill in all fields.`,
        },
        {
          status: 400,
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

    const website = await db.wordpressWebsite.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        websiteName,
        websiteLink,
        username,
        password,
      },
    });

    return NextResponse.json(
      {
        msg: `Wordpress website added successfully.`,
        website,
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
    await db.wordpressWebsite.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(
      {
        msg: `Website deleted Successfully`,
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

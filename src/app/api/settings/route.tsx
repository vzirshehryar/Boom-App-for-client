import { env } from "@/env";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import * as CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { openaiApiKey, niche, country } = body;

    if (!openaiApiKey) {
      return NextResponse.json(
        {
          msg: `OpenAI API key is required.`,
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
    // @ts-ignore
    session.user.openaiApiKey = openaiApiKey;

    const data = {
      openaiApiKey: user.openaiApiKey,
    };

    const encryptedOpenaiApiKey = CryptoJS.AES.encrypt(
      openaiApiKey,
      env.CRYPTO_SECRET,
    ).toString();

    if (encryptedOpenaiApiKey !== user.openaiApiKey) {
      data.openaiApiKey = encryptedOpenaiApiKey;
    }

    // update user
    await db.user.update({
      where: {
        id: user.id,
      },
      data,
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

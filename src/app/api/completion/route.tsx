import { NextRequest, NextResponse } from "next/server";
import { Propmts } from "@/libs/prompts";
import { chunkOutlineByH2, getCompletion, lowerTags } from "@/libs/utils";
import { db } from "@/server/db";
import { auth } from "@/server/auth";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.promptType) {
      return NextResponse.json(
        {
          msg: `Please fill all the required fields.`,
        },
        {
          status: 400,
        },
      );
    }

    if (!body.apiKey) {
      return NextResponse.json(
        {
          msg: `OpenAI API Key not found. Please add your OpenAI API Key in the settings.`,
        },
        {
          status: 400,
        },
      );
    }

    const {
      topic,
      keywords,
      audience,
      language,
      location,
      tone,
      model,
      promptType,
      apiKey,
      title,
      outline,
    } = body;

    if (body.promptType === "title") {
      if (!topic || !keywords || !tone || !model || !promptType) {
        return NextResponse.json(
          {
            msg: `Please fill all the required fields.`,
          },
          {
            status: 400,
          },
        );
      }

      const titlePrompt = Propmts.title({
        topic,
        keywords,
        targetAudience: audience,
        targetLocation: location,
      });
      const title = await getCompletion(apiKey, titlePrompt, model);

      if (typeof title === "object") {
        return NextResponse.json(
          {
            msg: `Something went wrong, please try again.`,
          },
          {
            status: 500,
          },
        );
      }

      return NextResponse.json(
        {
          msg: `Title Generated.`,
          data: title.replace(/"/g, "")
        },
        {
          status: 201,
        },
      );
    }

    if (body.promptType === "outline") {
      if (!topic || !keywords || !tone || !model || !promptType) {
        return NextResponse.json(
          {
            msg: `Please fill all the required fields.`,
          },
          {
            status: 400,
          },
        );
      }

      const outlinePrompt = Propmts.outline({
        generatedTitle: title || "",
        topic,
        keywords,
        targetAudience: audience,
        targetLocation: location,
        language,
      });

      const outline = await getCompletion(apiKey, outlinePrompt, model);

      if (typeof outline === "object") {
        return NextResponse.json(
          {
            msg: `Something went wrong, please try again.`,
          },
          {
            status: 500,
          },
        );
      }

      return NextResponse.json(
        {
          msg: `Outline Generated Succefully.`,
          data: outline,
        },
        {
          status: 201,
        },
      );
    }

    if (body.promptType === "blog") {
      if (!title || !outline || !topic || !keywords || !model || !promptType) {
        return NextResponse.json(
          {
            msg: `Please fill all the required fields.`,
          },
          {
            status: 400,
          },
        );
      }

      let newOutline = outline.replace(/(<\/?[^!][^>]+)/g, lowerTags);
      newOutline = chunkOutlineByH2(newOutline);
      let blog = "";
      for (let i = 0; i < newOutline.length; i++) {
        if (i === 0) {
          const blogFirstParagraph = Propmts.blogFirstParagraph({
            title,
            outline: newOutline[i],
            language,
          });
          const part = await getCompletion(apiKey, blogFirstParagraph, model);
          blog += part;
        } else if (i === newOutline.length - 1) {
          const blogLastParagraph = Propmts.blogLastParagraph({
            title,
            outline: newOutline[i],
            language,
          });
          blog += await getCompletion(apiKey, blogLastParagraph, model);
        } else {
          const blogBetween = Propmts.blogBetween({
            title,
            outline: newOutline[i],
            language,
            targetAudience: audience,
            targetLocation: location,
          });
          blog += await getCompletion(apiKey, blogBetween, model);
        }
      }

      const session = await auth();

      if (session) {
        await db.history.create({
          data: {
            topic,
            keyword: keywords,
            audience,
            language,
            location,
            tone,
            model,
            title,
            outline,
            content: blog,
            userId: session.user.id,
          },
        });
      }

      return NextResponse.json(
        {
          msg: `Blog Generated Succefully.`,
          data: blog,
        },
        {
          status: 201,
        },
      );
    }
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

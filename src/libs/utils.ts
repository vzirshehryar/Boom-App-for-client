import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import OpenAI from "openai";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { env } from "@/env";
import * as CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

// export const getCompletion = async (
//   apiKey: string,
//   prompt: string,
//   model: string,
// ) => {
//   try {
//     const openai = "https://api.openai.com/v1/chat/completions";
//     const res = await fetch(openai, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         model: model,
//         messages: [{ role: "system", content: prompt }],
//         max_tokens: 1200,
//       }),
//     });

//     let data = await res.json();
//     data = data.choices[0].message.content;
//     return data;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       error: error.message,
//     };
//   }
// };
export const getCompletion = async (
  apiKey: string,
  prompt: string,
  model: string,
) => {
  try {
    const openai = new OpenAI({
      apiKey,
    });
    const res = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "system", content: prompt }],
      max_tokens: 1200,
    });

    const data = res?.choices[0]?.message.content || "";
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

export const convertMarkdownToHtml = async (markdown: string) => {
  if (!markdown) {
    return "";
  }
  if (markdown.includes("```html")) {
    markdown = markdown.replace(/```html/g, "");
  }
  if (markdown.includes("```")) {
    markdown = markdown.replace(/```/g, "");
  }

  const parsedMarkdown = await marked.parse(markdown);
  const html = DOMPurify.sanitize(parsedMarkdown);
  return html;
};

export const sanitizeString = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, "");
};

export const lowerTags = (match: string) => {
  return match.toLowerCase();
};

export function chunkOutlineByH2(outline: string) {
  const chunks = outline.split(/(<h2>.*?<\/h2>)/i);
  const result = [];
  let currentChunk = "";

  for (const chunk of chunks) {
    if (chunk.toLowerCase().startsWith("<h2>")) {
      if (currentChunk !== "") {
        result.push(currentChunk);
      }
      currentChunk = chunk;
    } else {
      currentChunk += chunk;
    }
  }

  if (currentChunk !== "") {
    result.push(currentChunk);
  }

  return result;
}

export const decrypt = (data?: string | undefined | null) => {
  if (!data) {
    return;
  }
  return CryptoJS.AES.decrypt(data, env.CRYPTO_SECRET).toString(
    CryptoJS.enc.Utf8,
  );
};
interface PostData {
  title: string;
  content: string;
  status: string;
}

export const postWordPressBlog = async ({
  postData,
  wpWebsite,
  wpUsername,
  wpPassoword,
}: {
  postData: PostData;
  wpWebsite: string;
  wpUsername: string;
  wpPassoword: string;
}) => {
  const credentials = wpUsername + ":" + wpPassoword;
  const token = Buffer.from(credentials).toString("base64");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${token}`,
  };

  try {
    const response = await fetch(`${wpWebsite}/wp-json/wp/v2/posts`, {
      method: "POST",
      headers,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create blog post. Status: ${response.status}`);
    }

    const responseData = await response.json();

    return {
      success: true,
      msg: "Blog post created successfully",
      data: responseData,
    };
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

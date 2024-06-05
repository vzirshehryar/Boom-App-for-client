"use client";

import Input from "@/components/Input";
import Select from "@/components/Select";
import { modelOptions, toneOptions } from "@/libs/config";
import { useState, useMemo, useEffect } from "react";
import toast from "@/components/toast";
import { Icons } from "@/components/Icons";
import { convertMarkdownToHtml, postWordPressBlog } from "@/libs/utils";
import QuilEditor from "@/components/QuilEditor";
import { useSearchParams } from "next/navigation";

const BlogForm = ({ user }: { user: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingBlog, setIsLoadingBlog] = useState<boolean>(false);
  const [isPostingBlog, setIsPostingBlog] = useState<boolean>(false);
  const [selectedWordpressWebsite, setSelectedWordpressWebsite] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    setSelectedWordpressWebsite(user.wordpressWebsites[0]?.websiteName);

    const id = searchParams.get("id");

    const fetchHistory = async () => {
      const res = await fetch(`/api/history`, {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.data) {
        setBlogValue(data.data.content);
        setTitleValue(data.data.title);
        setOutlineValue(data.data.outline);
        setFormData({
          topic: data.data.topic,
          keywords: data.data.keyword,
          audience: data.data.audience,
          language: data.data.language,
          location: data.data.location,
          tone: data.data.tone,
          model: data.data.model,
        });
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };
    if (id) {
      fetchHistory();
    }
  }, []);

  const [formData, setFormData] = useState({
    topic: "",
    keywords: "",
    audience: "",
    language: "",
    location: "",
    tone: toneOptions[0],
    model: modelOptions[0],
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.topic ||
      !formData.keywords ||
      !formData.tone ||
      !formData.model
    ) {
      toast({
        title: "Please fill all the required fields",
        icon: "error",
      });
      return;
    }

    if (
      !user.openaiApiKey ||
      user.openaiApiKey === null ||
      user.openaiApiKey === ""
    ) {
      toast({
        title:
          "OpenAI API Key not found. Please add your OpenAI API Key in the settings.",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);

    const responseTitle = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        language: formData.language || "en",
        apiKey: user.openaiApiKey,
        promptType: "title",
      }),
    });
    const resTitle = await responseTitle.json();
    if (responseTitle.status === 201) {
      toast({
        title: resTitle.msg,
      });
      setTitleValue(resTitle.data);
    } else {
      toast({
        title: resTitle.msg,
        icon: "error",
      });
    }
    const responseOutline = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        apiKey: user.openaiApiKey,
        promptType: "outline",
      }),
    });
    const resOutline = await responseOutline.json();
    if (responseOutline.status === 201) {
      toast({
        title: resOutline.msg,
      });
      let outlines = await convertMarkdownToHtml(resOutline.data);
      setOutlineValue(outlines);
    } else {
      toast({
        title: resOutline.msg,
        icon: "error",
      });
    }
    setIsLoading(false);
  };

  const generateBlog = async () => {
    if (!titleValue || !outlineValue) {
      toast({
        title: "Title and Outline are required to generate a blog.",
        icon: "error",
      });
      return;
    }
    setIsLoadingBlog(true);
    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        language: formData.language || "en",
        title: titleValue,
        outline: outlineValue,
        apiKey: user.openaiApiKey,
        promptType: "blog",
      }),
    });
    const resData = await response.json();
    if (response.status === 201) {
      toast({
        title: resData.msg,
      });
      let blog = resData.data;
      setBlogValue(blog);
    } else {
      toast({
        title: resData.msg,
        icon: "error",
      });
    }
    setIsLoadingBlog(false);
  };

  const [outlineValue, setOutlineValue] = useState("");
  const [blogValue, setBlogValue] = useState("");
  const [titleValue, setTitleValue] = useState("");

  const handlePostWordPressBlog = async () => {
    if (!titleValue || !blogValue) {
      toast({
        title: "Title and Blog are required to post on WordPress.",
        icon: "error",
      });
      return;
    }

    if (!selectedWordpressWebsite) {
      toast({
        title:
          "Please select a website to post the blog. You can add websites in the settings.",
        icon: "error",
      });
      return;
    }

    const websiteDetails = user.wordpressWebsites.find(
      (site: any) => site.websiteName === selectedWordpressWebsite,
    );

    setIsPostingBlog(true);
    const postData = {
      title: titleValue,
      content: blogValue,
      status: "draft",
    };

    const res = await postWordPressBlog({
      postData,
      wpWebsite: websiteDetails.websiteLink,
      wpUsername: websiteDetails.username,
      wpPassoword: websiteDetails.password,
    });
    if (res.success) {
      toast({
        title: res.msg,
      });
    } else {
      toast({
        title: res.msg,
        icon: "error",
      });
    }
    setIsPostingBlog(false);
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="topic" className="mb-2 block text-muted">
            Topic*
          </label>
          <Input
            type="text"
            placeholder="Blog Topic"
            id="topic"
            onChange={onChange}
            value={formData.topic}
            name="topic"
          />
        </div>
        <div>
          <label htmlFor="keywords" className="mb-2 block text-muted">
            Keywords*
          </label>
          <Input
            type="text"
            placeholder="2-3 keywords"
            id="keywords"
            onChange={onChange}
            value={formData.keywords}
            name="keywords"
          />
        </div>
        <div>
          <label htmlFor="audience" className="mb-2 block text-muted">
            Target Audience
          </label>
          <Input
            type="text"
            placeholder="Audience Type"
            id="audience"
            onChange={onChange}
            value={formData.audience}
            name="audience"
          />
        </div>
        <div>
          <label htmlFor="language" className="mb-2 block text-muted">
            Language
          </label>
          <Input
            type="text"
            placeholder="Language of the blog (default: English)"
            id="language"
            onChange={onChange}
            value={formData.language}
            name="language"
          />
        </div>
        <div>
          <label htmlFor="location" className="mb-2 block text-muted">
            Target Location
          </label>
          <Input
            type="text"
            placeholder="Target audience location"
            id="location"
            onChange={onChange}
            value={formData.location}
            name="location"
          />
        </div>
        <div>
          <label htmlFor="tone" className="mb-2 block text-muted">
            Tone
          </label>
          <Select
            options={toneOptions}
            onChange={onSelectChange}
            defaultValue={formData.tone}
            name="tone"
          />
        </div>
        <div>
          <label htmlFor="model" className="mb-2 block text-muted">
            Model
          </label>
          <Select
            options={modelOptions}
            onChange={onSelectChange}
            defaultValue={formData.model}
            name="model"
          />
        </div>
        <div className="!mt-10 w-full ">
          <button
            type="submit"
            className=" mx-auto flex items-center gap-4 rounded-xl bg-primary px-10 py-3 text-white disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isLoading || isLoadingBlog || isPostingBlog}
          >
            {isLoading && (
              <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
            )}{" "}
            Generate Outline
          </button>
        </div>
      </form>
      <div className="mt-10 ">
        <label className="mb-2 block text-muted">Generated Title</label>
        <Input
          type="text"
          placeholder="Title"
          id="title"
          onChange={(e) => setTitleValue(e.target.value)}
          value={titleValue}
        />
      </div>
      <div className="mt-10 ">
        <label className="mb-2 block text-muted">Generated Outline</label>
        <QuilEditor
          value={outlineValue}
          onChange={setOutlineValue}
          counterId={"outlinechars"}
        />
      </div>
      <div className="mt-10 w-full ">
        <button
          type="button"
          className=" mx-auto flex items-center gap-4 rounded-xl bg-primary px-10 py-3 text-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isLoading || isLoadingBlog || isPostingBlog}
          onClick={generateBlog}
        >
          {isLoadingBlog && (
            <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
          )}{" "}
          Generate Blog
        </button>
      </div>
      <div className="mt-10 ">
        <label className="mb-2 block text-muted">Generated Blog</label>
        <QuilEditor
          value={blogValue}
          onChange={setBlogValue}
          counterId={"blogchars"}
        />
      </div>
      <div className="mt-10 flex w-full items-end justify-between">
        <div>
          <label htmlFor="wordpressWebsites" className="mb-2 block text-muted">
            Select Website
          </label>
          <Select
            options={user.wordpressWebsites.map(
              (site: any) => site.websiteName,
            )}
            onChange={(e) => setSelectedWordpressWebsite(e.target.value)}
            defaultValue={selectedWordpressWebsite}
            name="wordpressWebsites"
          />
        </div>
        <button
          type="button"
          className="flex items-center gap-4 rounded-xl bg-primary px-10 py-3 text-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isLoading || isLoadingBlog || isPostingBlog}
          onClick={handlePostWordPressBlog}
        >
          {isPostingBlog && (
            <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
          )}{" "}
          Post on WordPress
        </button>
      </div>
    </>
  );
};

export default BlogForm;

"use client";
import React, { useState } from "react";
import Input from "./Input";
import toast from "./toast";
import { Icons } from "./Icons";
import WebsiteItem from "./WebsiteItem";

const Wordpress = ({ user }: { user: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    websiteName: "",
    websiteLink: "",
    username: "",
    password: "",
  });

  const [newWebsites, setNewWebsite] = useState([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.websiteName ||
      !formData.websiteLink ||
      !formData.username ||
      !formData.password
    ) {
      toast({
        title: "Please fill in all fields",
        icon: "error",
      });
      return;
    }
    setIsLoading(true);

    const response = await fetch("/api/wordpress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const resData = await response.json();

    if (response.status === 201) {
      toast({
        title: resData.msg,
      });
      setNewWebsite((prev) => [...prev, resData.website]);
      setFormData({
        websiteName: "",
        websiteLink: "",
        username: "",
        password: "",
      });
    } else {
      toast({
        title: resData.msg,
        icon: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="websiteName" className="mb-2 block text-muted">
            Website Name *
          </label>
          <Input
            type="text"
            placeholder="Enter wordpress website title here"
            id="websiteName"
            onChange={onChange}
            value={formData.websiteName}
            name="websiteName"
          />
        </div>
        <div>
          <label htmlFor="websiteLink" className="mb-2 block text-muted">
            Website Link *
          </label>
          <Input
            type="text"
            placeholder="Enter wordpress website root link here"
            id="websiteLink"
            onChange={onChange}
            value={formData.websiteLink}
            name="websiteLink"
          />
        </div>
        <div>
          <label htmlFor="username" className="mb-2 block text-muted">
            Wordpress Username *
          </label>
          <Input
            type="text"
            placeholder="Enter wordpress website username here"
            id="username"
            onChange={onChange}
            value={formData.username}
            name="username"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-muted">
            Wordpress App Password *
          </label>
          <Input
            type="text"
            placeholder="Enter wordpress website password here"
            id="password"
            onChange={onChange}
            value={formData.password}
            name="password"
          />
        </div>
        <div className="!mt-10 flex justify-center">
          <button
            type="submit"
            className=" flex items-center gap-4 rounded-xl bg-primary px-10 py-3 text-white"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
            )}{" "}
            Add Website
          </button>
        </div>
      </form>
      <h3 className="mt-20">Existing Wesites</h3>
      <div className="mt-10 w-full space-y-5">
        {newWebsites.map((w) => (
          <WebsiteItem key={w.id} website={w} />
        ))}
        {user.wordpressWebsites.map((w) => (
          <WebsiteItem key={w.id} website={w} />
        ))}
      </div>
    </>
  );
};

export default Wordpress;

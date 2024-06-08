export const navLinks = [
  {
    href: "/dashboard",
    label: "History",
  },
  {
    href: "/dashboard/blog",
    label: "Short Blogs",
  },
];
export const settingsLinks = [
  {
    href: "/dashboard/settings",
    label: "Profile Settings",
  },
  {
    href: "/dashboard/wordpress",
    label: "Wordpress Websites",
  },
  {
    href: "/dashboard/subscription",
    label: "Manage Subscription",
  },
];

export const toneOptions = [
  "Informative",
  "Educational",
  "Entertaining",
  "Inspirational",
  "Persuasive",
  "Promotional",
  "Instructional",
  "Technical",
  "Conversational",
  "Professional",
  "Formal",
  "Casual",
  "Humorous",
  "Serious",
  "Friendly",
  "Sarcastic",
  "Respectful",
  "Enthusiastic",
  "Neutral",
  "Other",
];

export const modelOptions = ["gpt-3.5-turbo", "gpt-4", "gpt-4o"];

export const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  [{ align: [] }],

  [], // remove formatting button
];

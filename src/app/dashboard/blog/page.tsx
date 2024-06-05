import BlogForm from "@/components/BlogForm";
import { auth } from "@/server/auth";

const Page = async () => {
  const session = await auth();
  return (
    <div className="w-full max-w-4xl">
      <h3>Generate a Short Blog ASAP</h3>
      <div className=" mt-10 pb-20 ">
        <BlogForm user={session?.user} />
      </div>
    </div>
  );
};

export default Page;

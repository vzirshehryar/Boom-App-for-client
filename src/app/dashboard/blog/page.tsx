import BlogForm from "@/components/BlogForm";
import { subscriptionDetails } from "@/libs/stripe";
import { auth } from "@/server/auth";

const Page = async () => {
  const session = await auth();
  const sub = await subscriptionDetails(session.user.stripeCustomerId);
  console.log("sub value is : ", sub);
  return (
    <div className="w-full max-w-4xl">
      <h3>Generate a Short Blog ASAP</h3>
      <div className=" mt-10 pb-20 ">
        {/* @ts-ignore */}
        <BlogForm user={session?.user} planPriceId={sub ? sub.plan.id : sub} />
      </div>
    </div>
  );
};

export default Page;

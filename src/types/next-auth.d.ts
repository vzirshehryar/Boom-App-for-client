import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      stripeCustomerId?: string;
      trialClaimed?: boolean;
      wordpressWebsites?: {
        id: string;
        websiteName: string;
        username: string;
        password: string;
      }[];
    };
  }
}

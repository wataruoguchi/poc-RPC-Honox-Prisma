import { UserService } from "@poc-rpc/prisma-d1";
import {} from "hono";

type Bindings = {
  USER_SERVICE: UserService;
};

type Head = {
  title?: string;
};

declare module "hono" {
  interface Env {
    Variables: {};
    Bindings: Bindings;
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head):
      | Response
      | Promise<Response>;
  }
}

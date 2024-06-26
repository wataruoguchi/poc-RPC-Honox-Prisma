import { type D1Database } from "@cloudflare/workers-types";
import { WorkerEntrypoint } from "cloudflare:workers";
import { connection } from "./database/client";

export interface Env {
  DB: D1Database;
}

export class UserService extends WorkerEntrypoint<Env> {
  fetchUsers() {
    const db = connection(this.env.DB);
    return db.user.findMany();
  }

  async createUser(data: { name: string; email: string }) {
    const db = connection(this.env.DB);
    const user = await db.user.create({
      data,
    });

    return user;
  }
}

export default {
  // An error occurs when deploying this worker without register event handlers as default export.
  async fetch() {
    return new Response("Healthy!");
  },
};

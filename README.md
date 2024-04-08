# PoC - RPC with Honox and Prisma

This repository contains a proof of concept for connecting Honox and Prisma with the new RPC system.

## RPC? What?

Cloudflare announced a built-in RPC system for Worker-to-Worker. [Release Notes](https://blog.cloudflare.com/javascript-native-rpc).

## Reference (JA)

- [RPC 対応により Cloudflare Workers 間の連携がすごいことになった](https://zenn.dev/chimame/articles/f86db24897be6a) by [@chimame](https://github.com/chimame)
- [Prisma driver adapter for Cloudflare D1 を Remix に組み込む](https://zenn.dev/chimame/articles/d3e7af9a612038) by [@chimame](https://github.com/chimame)
- [Honox](https://github.com/honojs/honox)

## How to run

This repository requires you to install [bun](https://bun.sh/) on your device.

1. Create `srangler.toml` for each package. Please see the example files.
2. Install dependencies.
3. Run the following to run two projects in parallel.
4. Open `http://localhost:8789` in your browser.
   - Type any string in "Name" and "Email" and click "Create User".
   - You will see the user is created in D1 and the user list appears underneath the form.

```sh
# In the root directory
bun install
bun run dev
```

## Highlights

### `packages/prisma-d1`

The class `UserService` which extends `WorkerEntrypoint` in `src/index.ts` is the one that defines the RPC methods.

### `packages/honox`

It depends on a service defined in the `wrangler.toml`. `global.d.ts` is where you import the type declaration for Honox. The service itself is used in `app/routes/index.ts` via `c.env`. Although this repository has multiple Workers, the RPC makes it possible to call one service from the other seamlessly.

## Difficulties

- Running the honox project with bun via vite.

# prisma-d1

KUDOS: - [https://zenn.dev/chimame/articles/f86db24897be6a](https://zenn.dev/chimame/articles/f86db24897be6a) and its [repo](https://github.com/chimame/connect-remix-and-prisma-d1-using-rpc-on-cloudflare-pages).

## History

```sh
bun add -D wrangler @cloudflare/workers-types
bunx wrangler d1 create prisma-rpc-db
touch wrangler.toml # Copy the output of the line above and paste it in this file
mkdir -p src/database
```

Add the following in `prisma/schema.prisma`

```prisma
model User {
  id    Int  @id @default(autoincrement())
  email String
  name  String?
}
```

Then run the line below. It creates `prisma/migrations`, `prisma/dev.db`, and `prisma/dev.db-journal`.

```sh
bunx prisma migrate dev --name add_user_model
```

```sh
bunx wrangler types # Expose the type
```

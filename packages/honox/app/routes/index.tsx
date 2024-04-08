import { css } from "hono/css";
import { createRoute } from "honox/factory";

const className = css`
  font-family: sans-serif;
`;

export const POST = createRoute(async (c) => {
  const { name, email } = await c.req.parseBody<{
    name: string;
    email: string;
  }>();
  c.env.USER_SERVICE.createUser({ name, email });
  return c.redirect("/");
});

export default createRoute(async (c) => {
  const users = await c.env.USER_SERVICE.fetchUsers();
  return c.render(
    <div class={className}>
      <form method="POST">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <button type="submit">Create User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} / {user.email}
          </li>
        ))}
      </ul>
    </div>,
    { title: "Home" }
  );
});

import Logo from "../utils/Logo";
import { NavLink, Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  return json({ user });
};

function MainHeader() {
  const data = useLoaderData<typeof loader>();
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink
              to="/"
              className={`${(isActive: boolean) => (isActive ? "active" : "")}`}
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={`${(isActive: boolean) => (isActive ? "active" : "")}`}
            >
              pricing
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/expenses"
              className={`${(isActive: boolean) => (isActive ? "active" : "")}`}
            >
              expenses
            </NavLink>
          </li> */}
        </ul>
      </nav>
      <nav id="auth-nav">
        <ul>
          <li>
            {/* { data.user ? (
              <div className="user-info">
                <span>{`Hi ${data.user.username || "Welcome"}`}</span>
                <form action="/logout" method="post">
                  <button type="submit" className="button">
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <Link to="/login" className="auth">
                Login
              </Link>
            )} */}
            <Link to="/login" className="auth">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;

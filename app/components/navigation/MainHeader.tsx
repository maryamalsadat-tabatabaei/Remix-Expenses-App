import Logo from "../utils/Logo";
import { NavLink, Link, useLoaderData } from "@remix-run/react";
import type { User } from "@prisma/client";
import Dropdown from "../utils/Dropdown";

// type LoaderData = { data: Array<User> };
function MainHeader() {
  const data = useLoaderData();

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
        </ul>
      </nav>
      <nav id="auth-nav">
        <ul>
          <li>
            {data?.user ? (
              <div className="user-info">
                <Dropdown
                  profileName={data?.user?.username || "Welcome"}
                  profilePicture={data?.user?.picture || undefined}
                />
              </div>
            ) : (
              <Link to="/login" className="auth">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;

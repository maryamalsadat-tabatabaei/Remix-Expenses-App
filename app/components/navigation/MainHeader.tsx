import Logo from "../utils/Logo";
import { NavLink, Link } from "@remix-run/react";

function MainHeader() {
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
          <li>
            <NavLink
              to="/expenses"
              className={`${(isActive: boolean) => (isActive ? "active" : "")}`}
            >
              expenses
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav id="auth-nav">
        <ul>
          <li>
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

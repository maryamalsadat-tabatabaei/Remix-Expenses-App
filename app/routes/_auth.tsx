import { Outlet } from "@remix-run/react";
import AuthHeader from "~/components/navigation/AuthHeader";

export default function AuthPage() {
  return (
    <>
      <AuthHeader />
      <div className="flex flex-row gap-1 ">
        <Outlet />
        <img
          src="assets/images/signup.svg"
          alt="Login svg"
          className="h-96 self-end shadow-sm"
        />
      </div>
    </>
  );
}

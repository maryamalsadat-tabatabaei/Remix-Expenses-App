import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";

export default function AuthPage() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

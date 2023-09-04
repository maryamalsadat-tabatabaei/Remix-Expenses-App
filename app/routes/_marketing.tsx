import { Outlet } from "@remix-run/react";

import MainHeader from "~/components/navigation/MainHeader";
import marketingStyles from "~/styles/marketing.css";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUser } from "~/utils/session.server";

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}
export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  return json({ user });
};

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}

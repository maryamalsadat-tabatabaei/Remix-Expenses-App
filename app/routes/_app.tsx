import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses/expenses.css";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUser } from "~/utils/session.server";

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  return json({ user });
};
export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}

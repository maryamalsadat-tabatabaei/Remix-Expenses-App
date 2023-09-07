import type { ActionArgs } from "@remix-run/node";
import { logout } from "~/utils/session.server";
import { redirect } from "@remix-run/node";

export const action = async ({ request }: ActionArgs) => logout(request);

export const loader = async () => redirect("/login");

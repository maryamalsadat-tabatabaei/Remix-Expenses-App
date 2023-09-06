import { json } from "@remix-run/node";
import db from "~/utils/db.server";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const expensesRawListItems = await db.expense.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      title: true,
      amount: true,
      date: true,
      updatedAt: true,
      createdAt: true,
    },
  });

  return json({
    expensesRawListItems,
  });
};

import { z } from "zod";
import { json } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
  Link,
} from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import db from "~/utils/db.server";
import { FaPlus, FaDownload } from "react-icons/fa";
import expensesStyles from "~/styles/expenses/expenses.css";
import type { LoaderFunction } from "@remix-run/node";
import type { Expense } from "@prisma/client";

type LoaderData = { randomExpensesListItems: Array<Expense> };

export const loader: LoaderFunction = async () => {
  const count = await db.expense.count();
  const randomRowNumber = Math.floor(Math.random() * count);

  const randomExpensesListItems = await db.expense.findMany({
    // skip: randomRowNumber,
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, amount: true },
    take: 5,
  });
  if (!randomExpensesListItems) {
    throw new Response("No random expense found", {
      status: 404,
    });
  }
  return json({
    randomExpensesListItems,
  });
};

// const EspenseData = z.object({
//   title: z.string(),
//   amount: z.number(),
//   createdAt: z.date(),
// });

export default function ExpensesLayout() {
  const data = useLoaderData<LoaderData>();
  const hasExpenses = data && data.randomExpensesListItems.length > 0;
  // try {
  //   EspenseData.parse(data);
  // } catch {
  //   console.log("error");
  // }

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>

        {hasExpenses && (
          <ExpensesList expenses={data.randomExpensesListItems} />
        )}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="error">
        <p>There are no Expenses to display.</p>
        <Link to="new">Add your own</Link>
      </div>
    );
  }

  return <div className="error">I did a whoopsies.</div>;
}

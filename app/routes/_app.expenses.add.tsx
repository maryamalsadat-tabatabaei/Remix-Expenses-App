import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import styles from "~/styles/expenses/create-expense.css";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/utils/Modal";
import db from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { getUserId, requireUserId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return json({});
};
function validateExpenseTitle(title: string): string | null {
  if (title.length < 10) {
    return "That expense title is too short";
  }
  return null;
}

function validateExpenseAmount(amount: string): string | null {
  if (parseFloat(amount) < 0) {
    return "The expense amount can not be negative";
  }
  return null;
}
function validateExpenseDate(date: string): string | null {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return "Invalid date format. Please use YYYY-MM-DD format.";
  }
  const expenseDate = new Date(date);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  expenseDate.setHours(0, 0, 0, 0);
  if (expenseDate > currentDate) {
    return "The future expense doesn't count";
  }
  return null;
}
export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const date = formData.get("date") as string;
  if (
    !title ||
    typeof title !== "string" ||
    isNaN(amount) ||
    typeof date !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }
  const fieldErrors = {
    title: validateExpenseTitle(title),
    amount: validateExpenseAmount(amount.toString()),
    expenseDate: validateExpenseDate(date),
  };
  const fields = { title, amount, date };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  try {
    await db.expense.create({
      data: {
        title,
        date: new Date(date).toISOString(),
        amount: parseFloat(amount.toString()),
        userId,
      },
    });
  } catch (error) {
    throw new Response("Error creating expense", {
      status: 400,
    });
  }
  return redirect(`/expenses`);
};

export default function AddExpensesPage() {
  const navigate = useNavigate();
  function closeHandler() {
    // navigate programmatically
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm mode="create" />
    </Modal>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 401) {
    return (
      <div className="error">
        <h2>You must be logged in to create an expense.</h2>
        <Link to="/login">Login</Link>
      </div>
    );
  }
  if (isRouteErrorResponse(error) && error.status === 400) {
    return (
      <div className="error">
        <h2>Error happened during creating the expense.</h2>
        <Link to="/expenses">Try again</Link>
      </div>
    );
  }
  return (
    <div className="error">
      <h2> Something unexpected went wrong. Sorry about that.</h2>
      <Link to="/">Return Home</Link>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

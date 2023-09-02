import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  Link,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import styles from "~/styles/expenses/create-expense.css";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/utils/Modal";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { getUserId, requireUserId } from "~/utils/session.server";

// export const loader = async ({ request }: LoaderArgs) => {
//   const userId = await getUserId(request);
//   if (!userId) {
//     throw new Response("Unauthorized", { status: 401 });
//   }
//   return json({});
// };
function validateExpenseTitle(title: string) {
  if (title.length < 10) {
    return "That expense title is too short";
  }
}

function validateExpenseAmount(amount: string) {
  if (parseFloat(amount) < 0) {
    return "The expense amount can not be negative";
  }
}
function validateExpenseDate(dateString: string) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return "Invalid date format. Please use YYYY-MM-DD format.";
  }
  const expenseDate = new Date(dateString);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  expenseDate.setHours(0, 0, 0, 0);
  if (expenseDate > currentDate) {
    return "The future expense doesn't count";
  }
  return null;
}
export const action = async ({ request }: ActionArgs) => {
  // const userId = await requireUserId(request);
  const formData = await request.formData();
  const { title, amount, date: expenseDate } = Object.fromEntries(formData);
  // if (
  //   typeof title !== "string" ||
  //   typeof amount !== "number"
  //    || !(expenseDate instanceof Date)
  // ) {
  //   return badRequest({
  //     fieldErrors: null,
  //     fields: null,
  //     formError: "Form not submitted correctly.",
  //   });
  // }
  const fieldErrors = {
    title: validateExpenseTitle(title),
    amount: validateExpenseAmount(amount),
    expenseDate: validateExpenseDate(expenseDate),
  };
  const fields = { title, amount, expenseDate };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const newExpense = await db.expense.create({
    // data: { ...fields, userId },

    data: { ...fields, amount: parseFloat(amount) },
  });
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
      <ExpenseForm />
    </Modal>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log("error", error);

  if (isRouteErrorResponse(error) && error.status === 401) {
    return (
      <div className="error">
        <h2>You must be logged in to create an expense.</h2>
        <Link to="/login">Login</Link>
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

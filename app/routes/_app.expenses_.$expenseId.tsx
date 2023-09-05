import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
  useNavigation,
  useNavigate,
  Outlet,
} from "@remix-run/react";
import db from "~/utils/db.server";
import { getUserId, requireUserId } from "~/utils/session.server";
import Modal from "~/components/utils/Modal";
import ExpenseForm from "~/components/expenses/ExpenseForm";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  const { description, title } = data
    ? {
        description: `Enjoy the "${data.expense.title}" information and much more`,
        title: `"${data.expense.title}" expense`,
      }
    : { description: "No expensefound", title: "No expense" };

  return [{ name: "description", content: description }, { title }];
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await getUserId(request);
  const expense = await db.expense.findUnique({
    where: { id: params.expenseId },
  });
  if (!expense) {
    throw new Response("What a expense! Not found.", {
      status: 404,
    });
  }
  return json({
    isOwner: userId === expense.userId,
    expense,
  });
};

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  if (form.get("intent") !== "delete" || form.get("intent") !== "update") {
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400,
    });
  }
  const userId = await requireUserId(request);
  const expense = await db.expense.findUnique({
    where: { id: params.expenseId },
  });
  if (!expense) {
    throw new Response("Can't delete what does not exist", {
      status: 404,
    });
  }
  if (expense.userId !== userId) {
    throw new Response("Pssh, nice try. That's not your expense", {
      status: 403,
    });
  }
  if (form.get("intent") === "delete") {
    await db.expense.delete({ where: { id: params.expenseId } });
    return redirect("/expenses");
  } else if (form.get("intent") === "update") {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const date = formData.get("date") as string;
    await db.expense.update({
      where: { id: params.expenseId },
      data: {
        title,
        date: new Date(date).toISOString(),
        amount: parseFloat(amount.toString()),
        userId,
      },
    });

    return redirect("/expenses");
  }
};

export default function ExpenseDetail() {
  const data = useLoaderData<typeof loader>();
  const params = useParams();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = Boolean(navigation.state === "submitting");

  function closeHandler() {
    // navigate programmatically
    navigate("..");
  }
  return (
    <>
      <article className="expense-item max-w-lg my-16 mx-auto">
        <div>
          <h2 className="expense-title">{data.expense.title}</h2>
          <p className="expense-amount">${data.expense.amount.toFixed(2)}</p>
        </div>
        {data.isOwner ? (
          <menu className="expense-actions">
            <Form method="post">
              <button
                className="button"
                name="intent"
                type="submit"
                value="delete"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete Expense"}
              </button>
            </Form>
            {/* <Modal onClose={closeHandler}>
            <ExpenseForm mode="update" />
          </Modal> */}
            {/* <Form method="post">
            <button
              className="button"
              name="intent"
              type="submit"
              value="update"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Expense"}
            </button>
          </Form> */}
            {/* <button onClick={deleteExpenseItemHandler}>Delete</button> */}
            <a href={params.expenseId + "/edit"}>Update Expense</a>
          </menu>
        ) : null}
      </article>
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const { expenseId } = useParams();
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return (
        <div className="error">
          <h2>What you're trying to do is not allowed.</h2>
          <Link to="/login">Login</Link>
        </div>
      );
    }
    if (error.status === 403) {
      return (
        <div className="error">
          <h2> Sorry, but "{expenseId}" is not your expense.</h2>
          <Link to="/login">Login</Link>
        </div>
      );
    }
    if (error.status === 404) {
      return (
        <div className="error">
          <h2>Huh? What the heck is "{expenseId}"?</h2>
          <Link to="/login">Login</Link>
        </div>
      );
    }
  }

  return (
    <div className="error">
      <h2>
        There was an error loading the expense by the id "${expenseId}". Sorry.
      </h2>
      <Link to="/login">Login</Link>
    </div>
  );
}

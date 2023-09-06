import {
  Form,
  useActionData,
  useNavigation,
  useLoaderData,
} from "@remix-run/react";
type FormProps = {
  mode: string;
};

export default function ExpenseForm({ mode }: FormProps) {
  const actionData = useActionData();
  const data = useLoaderData();
  const today = new Date().toISOString().slice(0, 10); //yields something like 2023-09-10
  const navigation = useNavigation();
  const isSubmitting = Boolean(navigation.state === "submitting");
  return (
    <Form
      method={mode === "create" ? "post" : "patch"}
      className="form"
      id="expense-form"
    >
      <div>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          // defaultValue={actionData?.fields?.title}
          defaultValue={data?.expense?.title}
          aria-invalid={Boolean(actionData?.fieldErrors?.title)}
          aria-errormessage={
            actionData?.fieldErrors?.title ? "title-error" : undefined
          }
        />{" "}
        {actionData?.fieldErrors?.title ? (
          <p className="form-validation-error" id="title-error" role="alert">
            {actionData.fieldErrors.title}
          </p>
        ) : null}
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            // defaultValue={actionData?.fields?.amount}
            defaultValue={data?.expense?.amount}
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            aria-invalid={Boolean(actionData?.fieldErrors?.amount)}
            aria-errormessage={
              actionData?.fieldErrors?.amount ? "amount-error" : undefined
            }
          />
          {actionData?.fieldErrors?.amount ? (
            <p className="form-validation-error" id="amount-error" role="alert">
              {actionData.fieldErrors.amount}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            // defaultValue={actionData?.fields?.date}

            defaultValue={
              data?.expense?.date &&
              new Date(data?.expense?.date).toISOString().slice(0, 10)
            }
            aria-invalid={Boolean(actionData?.fieldErrors?.expenseDate)}
            aria-errormessage={
              actionData?.fieldErrors?.expenseDate ? "date-error" : undefined
            }
          />{" "}
          {actionData?.fieldErrors?.expenseDate ? (
            <p className="form-validation-error" id="date-error" role="alert">
              {actionData.fieldErrors.expenseDate}
            </p>
          ) : null}
        </div>
      </div>
      <div className="form-actions">
        <button
          type="submit"
          disabled={isSubmitting}
          name="intent"
          value="update"
        >
          {mode === "create"
            ? isSubmitting
              ? "Creating..."
              : "Create Expense"
            : isSubmitting
            ? "Updating..."
            : "Update Expense"}
        </button>
        <a href=".">Cancel</a>
      </div>
    </Form>
  );
}

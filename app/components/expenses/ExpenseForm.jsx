import { Form, useActionData } from "@remix-run/react";

export default function ExpenseForm() {
  const actionData = useActionData();
  console.log("actionData", actionData);
  const today = new Date().toISOString().slice(0, 10); //yields something like 2023-09-10

  // if (navigation.formData) {
  //   const { title, amount, date: expenseDate } = Object.fromEntries(formData);
  //   if (
  //     typeof title !== "string" &&
  //     typeof amount !== "number" &&
  //     !(expenseDate instanceof Date) &&
  //     !validateExpenseTitle(title) &&
  //     !validateExpenseAmount(amount) &&
  //     !validateExpenseDate(expenseDate)
  //   ) {
  //     return (
  //       <JokeDisplay
  //         canDelete={false}
  //         isOwner={true}
  //         joke={{ name, content }}
  //       />
  //     );
  //   }
  // }
  //   function hasErrors(input: keyof typeof actionData.errors) {
  //   return {
  //     flag: Boolean(actionData?.errors?.[input]),
  //     message: actionData?.errors?.[input]?._errors[0],
  //   }
  // }
  return (
    <Form method="post" className="form" id="expense-form">
      <div>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={actionData?.fields?.title}
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
      <div>
        <label>
          Name:{" "}
          <input
            defaultValue={actionData?.fields?.name}
            name="name"
            type="text"
            aria-invalid={Boolean(actionData?.fieldErrors?.name)}
            aria-errormessage={
              actionData?.fieldErrors?.name ? "name-error" : undefined
            }
          />
        </label>
        {actionData?.fieldErrors?.name ? (
          <p className="form-validation-error" id="name-error" role="alert">
            {actionData.fieldErrors.name}
          </p>
        ) : null}
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            defaultValue={actionData?.fields?.amount}
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
            defaultValue={actionData?.fields?.date}
            aria-invalid={Boolean(actionData?.fieldErrors?.date)}
            aria-errormessage={
              actionData?.fieldErrors?.date ? "date-error" : undefined
            }
          />{" "}
          {actionData?.fieldErrors?.date ? (
            <p className="form-validation-error" id="date-error" role="alert">
              {actionData.fieldErrors.date}
            </p>
          ) : null}
        </div>
      </div>
      <div className="form-actions">
        <button type="submit">Save Expense</button>
        <a href="tbd">Cancel</a>
      </div>
    </Form>
  );
}

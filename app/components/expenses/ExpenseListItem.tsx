import { Link, Path } from "@remix-run/react";

type Expense = {
  title: String;
  amount: Number;
  id: Partial<Path>;
};

function ExpenseListItem({ title, amount, id }: Expense) {
  function deleteExpenseItemHandler() {
    // tbd
  }

  return (
    <article className="expense-item">
      <div>
        <Link to={id}>
          <h2 className="expense-title">{title}</h2>
          <p className="expense-amount">${amount.toFixed(2)}</p>
        </Link>
      </div>
      {/* <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <a href="tbd">Edit</a>
      </menu> */}
    </article>
  );
}

export default ExpenseListItem;

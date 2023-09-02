import type { ActionArgs } from "@remix-run/node";
import {
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";

export default function AuthForm() {
  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const authMode = searchParams.get("mode") || "login";
  const isSubmitting = navigation.state === "submitting";

  const submitBtnCaption = isSubmitting
    ? "Submitting..."
    : authMode === "login"
    ? "Login"
    : "Create User";
  const toggleBtnCaption = authMode === "login" ? "Signup" : "Login";

  return (
    <form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <input
        type="hidden"
        name="redirectTo"
        value={searchParams.get("redirectTo") ?? undefined}
      />
      <div className="form-group">
        <label htmlFor="email-input">Email Address</label>
        <input
          type="text"
          id="email-input"
          name="email"
          defaultValue={actionData?.fields?.email}
          aria-invalid={Boolean(actionData?.fieldErrors?.email)}
          aria-errormessage={
            actionData?.fieldErrors?.email ? "email-error" : undefined
          }
        />
        {actionData?.fieldErrors?.email ? (
          <p className="form-validation-error" role="alert" id="email-error">
            {actionData.fieldErrors.email}
          </p>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="password-input">Password</label>
        <input
          id="password-input"
          name="password"
          type="password"
          defaultValue={actionData?.fields?.password}
          aria-invalid={Boolean(actionData?.fieldErrors?.password)}
          aria-errormessage={
            actionData?.fieldErrors?.password ? "password-error" : undefined
          }
        />
        {actionData?.fieldErrors?.password ? (
          <p className="form-validation-error" role="alert" id="password-error">
            {actionData.fieldErrors.password}
          </p>
        ) : null}
      </div>
      <div id="form-error-message">
        {actionData?.formError ? (
          <p className="form-validation-error" role="alert">
            {actionData.formError}
          </p>
        ) : null}
      </div>
      <div className="form-actions">
        <button disabled={isSubmitting}>{submitBtnCaption}</button>
        <hr />
        <p>
          {authMode === "login" ? "Haven't Signup?" : "Already signup?"}
          <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>
            {toggleBtnCaption}
          </Link>
        </p>
      </div>
    </form>
  );
}

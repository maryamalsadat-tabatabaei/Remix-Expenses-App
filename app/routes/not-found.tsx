import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "@remix-run/react";

function NotFound() {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2> Page Not Found</h2>
      <Link to="/">Back Home</Link>
    </div>
  );
}

export default NotFound;

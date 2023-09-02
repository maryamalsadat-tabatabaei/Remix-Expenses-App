import { FaExclamationCircle } from "react-icons/fa";

function NotFound() {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2> Page Not Found</h2>
    </div>
  );
}

export default NotFound;

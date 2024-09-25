import { useNavigate } from "react-router-dom";
import "./index.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page-container">
      <h1>Page Not Found</h1>
      <button
        type="button"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Go to Home Page
      </button>
    </div>
  );
}

export default NotFound;

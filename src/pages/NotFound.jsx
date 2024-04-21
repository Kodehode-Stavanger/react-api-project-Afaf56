import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found. </h2>
      <br />
      <Link to="/">Go to main page</Link>
    </div>
  );
}

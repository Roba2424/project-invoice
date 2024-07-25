import { Link } from "react-router-dom";

export default function Logout({ user }) {
  return (
    <div>
      <header>
        <span>Welcome, {user.Name}</span>
        <Link to={'/'}>
          <button>Logout</button>
        </Link>
      </header>
    </div>
  );
}

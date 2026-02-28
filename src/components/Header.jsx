import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Abhinandan Events</h1>
      <div className="space-x-4">
        <Link to="/">Homes</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

export default Header;

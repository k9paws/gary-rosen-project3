import { Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <Link to={`/`}>
            <li>Home</li>
          </Link>
          <li>All Posts</li>
          <li>NEW POST</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

import { Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="navbar wrapper">
          <div className="navLeft">
            <ul>
              <h4>K9PAWS</h4>
              <Link to={`/`}>
                <li>Home</li>
              </Link>
              <li>All Posts</li>
              <li>
                <span>NEW POST</span>
              </li>
            </ul>
          </div>
          <div className="navRight">
            <label htmlFor="navSearchBar"></label>
            <input type="text" placeholder="Search Blog Posts"></input>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

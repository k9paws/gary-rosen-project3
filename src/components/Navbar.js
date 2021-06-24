import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div>
      <nav>
        <div className="navbar wrapper">
          <ul>
            <h4>K9PAWS</h4>

            <Link to={`/`} aria-label="Move to Home Page">
              <li>Home</li>
            </Link>

            <Link to={`/blog`} aria-label="Move to Blog Posts Page">
              <li>All Posts</li>
            </Link>

            <Link to={`/form`} aria-label="Move to Blog Post Form Page">
              <li>
                <span>NEW POST</span>
              </li>
            </Link>

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

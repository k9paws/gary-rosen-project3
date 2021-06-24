import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div>
      <nav>
        <div className="navbar wrapper">
          <div className="navLeft">
            <h4>K9PAWS</h4>
          </div>
          <div className="navRight">
            <ul>
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

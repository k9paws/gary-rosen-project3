import { Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

  const { postNum } = useParams();

  const [postCheck, setPostCheck] = useState()

  console.log(postNum);

  setPostCheck(postNum)

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
              <Link to={`/blog`}>
                <li>All Posts</li>
              </Link>
              <li>
                <a href="#postForm">
                  <span>NEW POST</span>
                </a>
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

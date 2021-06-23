import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

  let location = useLocation();

  // const [postCheck, setPostCheck] = useState();

//   console.log(postNum);

  console.log(location)

  const urlLink = location.pathname

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

              {/\d/.test(urlLink) ? null : 
              <li>
                <a href="#postForm">
                  <span>NEW POST</span>
                </a>
              </li>
                }
            </ul>
          {/* {postNum} */}
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

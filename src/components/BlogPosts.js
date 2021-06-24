import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import { Link } from "react-router-dom";

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const [categoryInput, setCategoryInput] = useState("");

  useEffect(() => {
    const blogRef = firebase.database().ref();

    blogRef.on("value", (response) => {
      const blogPostInfo = response.val();

      const allBlogPosts = [];

      for (let key in blogPostInfo) {
        allBlogPosts.unshift({
          key: key,
          name: blogPostInfo[key],
        });
      }

      setBlogPosts(allBlogPosts);
    });
  }, []);

  return (
    <div>
      <header>
        <div className="headerTitle wrapper">
          <h1>Lets Discuss Dogs!</h1>
          <h2>
            Search <span>All Posts</span>
          </h2>
        </div>
      </header>
      <section className="blogPostSection">
        <div className="blogPostContainer wrapper">
          <h2>Search Posts by Category:</h2>

          <label htmlFor="blogPostCategory" className="srOnly"></label>
          <select
            name="blogPostCategory"
            onChange={(event) => {
              setCategoryInput(event.target.value);
            }}
            value={categoryInput}
            className="categorySelectMenu"
          >
            <option value="">All Categories</option>
            <option value="General Interest">General Interest</option>
            <option value="Training Tools">Training Tools</option>
            <option value="Training Tips">Training Tips</option>
            <option value="Problem Behaviour">Problem Behaviour</option>
            <option value="Breeds">Breeds</option>
            <option value="Puppies">Puppies</option>
            <option value="Strange Stories">Strange Stories</option>
            <option value="Success Stories">Success Stories</option>
            <option value="Fun Stories">Fun Stories</option>
          </select>

          <ul>
            {blogPosts
              .filter((post) => {
                return post.name.category.includes(categoryInput);
              })
              .map((post) => {
                return (
                  <Link to={`/blog/${post.name.urlLink}`}>
                    <li key={post.key}>
                      <div className="blogPreviewCard">
                        <div>
                          <h3>{post.name.title}</h3>
                        </div>
                        <div>
                          <strong>Author:</strong> {post.name.name}
                        </div>
                        <div>
                          <strong>Category:</strong> {post.name.category}
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default BlogPosts;

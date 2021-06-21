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

      console.log(blogPostInfo);

      const allBlogPosts = [];

      for (let key in blogPostInfo) {
        allBlogPosts.unshift({
          key: key,
          name: blogPostInfo[key],
        });
      }

      console.log(allBlogPosts);

      setBlogPosts(allBlogPosts);

    });
  }, []);

  return (
    <div>
      <div className="blogPostContainer wrapper">
        <h1>This is the Page the Posts all the Blog Posts</h1>

        <label htmlFor="blogPostCategory" className="srOnly"></label>
        <select
          name="blogPostCategory"
          onChange={(event) => {
            setCategoryInput(event.target.value);
          }}
          value={categoryInput}
        >
          {/* <option value="noInput" disabled>
              Select Category </option> */}
          <option value="">All Categories</option>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Training Tools">Training Tools</option>
          <option value="Problem Behaviour">Problem Behaviour</option>
          <option value="Training Tips">Training Tips</option>
          <option value="Breeds">Breeds</option>
          <option value="Puppies">Puppies</option>
          <option value="Strange Stories">Strange Stories</option>
          <option value="Success Stories">Success Stories</option>
          <option value="Dog Packs">Dog Packs</option>
          <option value="FAQ">FAQ</option>
        </select>

        <ul>
          {blogPosts.filter((post) => {
              return post.name.category.includes(categoryInput)
          }).map((post) => {
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
                    <div className="postComment">{post.name.content}</div>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BlogPosts;

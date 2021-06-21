import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import { Link } from "react-router-dom";


const BlogPosts = () => {


  const [blogPosts, setBlogPosts] = useState([]);


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
      <h1>This is the Page the Posts all the Blog Posts</h1>

      <div className="blogPostContainer wrapper">
        <ul>
          {blogPosts.map((post) => {
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

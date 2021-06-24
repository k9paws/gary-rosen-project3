import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [recentPosts, setRecentPosts] = useState([]);

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

      const mostRecentPosts = allBlogPosts.slice(0, 3);

      setRecentPosts(mostRecentPosts);
    });
  }, []);

  return (
    <div>
      <header>
        <div className="headerTitle wrapper">
          <h1>Lets Discuss Dogs!</h1>
          <h2>
            The <span>JUNO College</span> Dog Blog
          </h2>
        </div>
      </header>

      <section className="recentPostDisplaySection">
        <div className="blogPostContainer wrapper">
          <h2>Recently Posted Stories:</h2>
          <ul>
            {recentPosts.map((post) => {
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

export default MainPage;

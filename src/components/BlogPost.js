import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const [blogPost, setBlogPost] = useState([]);

  const { postNum } = useParams();

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

      const result = allBlogPosts.filter((post) => {
        if (post.name.urlLink === postNum) {
          return true;
        } else {
          return false;
        }
      });

      setBlogPost(result[0].name);
    });
  }, [postNum]);

  return (
    <div>
      <header>
        <div className="headerTitle wrapper">
          <h1>Lets Discuss Dogs!</h1>
          <h2>
            <span>{blogPost.category}</span> POST
          </h2>
        </div>
      </header>

      <section className="fullPostSection">
        <div className="wrapper">
          <div className="blogFullPostDisplay">
            <h2>{blogPost.title}</h2>

            <h3>Author: {blogPost.name}</h3>
            <div className="blogFullPostDiv">
              <p
                dangerouslySetInnerHTML={{
                  __html: blogPost.content
                    ? blogPost.content.replace(/\n/g, "<br />")
                    : null,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;

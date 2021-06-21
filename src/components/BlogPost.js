import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import { useParams } from "react-router-dom";

const BlogPost = () => {


  const [blogPost, setBlogPost] = useState([]);

  const {postNum} = useParams();

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

        const result = allBlogPosts.filter((post) => {
          if (post.name.urlLink === postNum) {
              return true
          } else {
              return false
          }
      });

      console.log(result);

    
      console.log(result[0].name)

      setBlogPost(result[0].name);
    });
  }, []);


  return (
    <div>
      <h1>Blah</h1>

      {blogPost.title}
      {blogPost.name}
      {blogPost.category}
      {blogPost.content}

      
    </div>
  );
};

export default BlogPost;

import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import { Route, Link } from "react-router-dom";

const MainPage = () => {
  const [nameInput, setNameInput] = useState("");

  const [titleInput, setTitleInput] = useState("");

  const [categoryInput, setCategoryInput] = useState("");

  const [blogContentInput, setBlogContentInput] = useState("");

  const [displayPost, setDisplayPost] = useState(false);

  const [blogPosts, setBlogPosts] = useState([]);

  const [recentPosts, setRecentPosts] = useState([]);

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

      const mostRecentPosts = allBlogPosts.slice(0, 3);

      setRecentPosts(mostRecentPosts);
    });
  }, []);

  // HandleSubmit for the form
  const handleSubmit = (event) => {
    event.preventDefault();

    setDisplayPost(true);

    // Firebase Code

    const blogRef = firebase.database().ref();

    const blogPostInfo = blogRef;

    blogPostInfo.push({
      name: nameInput,
      title: titleInput,
      category: categoryInput,
      content: blogContentInput,
    });

    setNameInput("");
    setTitleInput("");
    setCategoryInput("");
    setBlogContentInput("");
  };

  return (
    <div>
      <header>
        <h1>K9PAWS</h1>
      </header>

      <section className="blogPostDisplay">
        <Link to={`/blog`}>
          <div>
            <h2>Recent BLOG Posts</h2>
          </div>
        </Link>

        {/* {displayPost ? <div>{nameInput}{titleInput}{blogContentInput}</div> : null} */}
        <div className="blogPostContainer">
          <ul>
            {recentPosts.map((post) => {
              return (
                <li key={post.key}>
                  <div>
                    <h3>{post.name.title}</h3>
                  </div>
                  <div>Author: {post.name.name}</div>
                  <div>Category: {post.name.category}</div>
                  <div>{post.name.content}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="blogPostComment">
        <form action="submit" onSubmit={handleSubmit}>
          <h2>Dog BLOG</h2>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={(event) => {
              setNameInput(event.target.value);
            }}
            value={nameInput}
          ></input>

          <label htmlFor="blogPostTitle">BLOG Post Title</label>
          <input
            type="text"
            onChange={(event) => {
              setTitleInput(event.target.value);
            }}
            value={titleInput}
          ></input>

          <label htmlFor="blogPostCategory" className="srOnly">
            Category
          </label>
          <select
            name="blogPostCategory"
            onChange={(event) => {
              setCategoryInput(event.target.value);
            }}
            value={categoryInput}
          >
            {/* <option value="noInput" disabled>
              Select Category </option> */}
            <option value="General Knowledge">General Knowledge</option>
            <option value="Training Tools">Training Tools</option>
            <option value="Problem Behaviour">Problem Behaviour</option>
            <option value="Training Tips">Training Tips</option>
            <option value="Strange Stories">Strange Stories</option>
            <option value="Success Stories">Success Stories</option>
            <option value="Dog Packs">Dog Packs</option>
            <option value="FAQ">FAQ</option>
          </select>

          <label htmlFor="blogPostContent">Your Post</label>
          <textarea
            type="text"
            cols="40"
            rows="20"
            onChange={(event) => {
              setBlogContentInput(event.target.value);
            }}
            value={blogContentInput}
          ></textarea>

          <button type="submit">Post your story!</button>
        </form>
      </section>
    </div>
  );
};

export default MainPage;

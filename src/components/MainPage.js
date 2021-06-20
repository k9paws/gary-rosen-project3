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
        <div className="headerTitle wrapper">
          <h1>Lets Discuss Dogs!</h1>
          <h2>Dog Behaviour BLOG</h2>
        </div>
      </header>

      <section className="blogPostDisplay">
        <div className="postDisplayContainer wrapper">
          <Link to={`/blog`}>
            <div>
              <h2>Recent BLOG Posts</h2>
            </div>
          </Link>

          {/* {displayPost ? <div>{nameInput}{titleInput}{blogContentInput}</div> : null} */}
          <div className="blogPostContainer wrapper">
            <ul>
              {recentPosts.map((post) => {
                return (
                  <div className="blogPreviewCard">
                    <li key={post.key}>
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
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="blogPostComment">
        <div className="wrapper">
          <div class="blogForm">
            <form action="submit" onSubmit={handleSubmit}>
              <h2>Create a New Post</h2>

              <label htmlFor="name"></label>
              <input
                type="text"
                onChange={(event) => {
                  setNameInput(event.target.value);
                }}
                value={nameInput}
                placeholder="Name"
              ></input>

              <label htmlFor="blogPostTitle"></label>
              <input
                type="text"
                onChange={(event) => {
                  setTitleInput(event.target.value);
                }}
                value={titleInput}
                placeholder="BLOG Post Title"
              ></input>

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

              <label htmlFor="blogPostContent"></label>
              <textarea
                type="text"
                cols="40"
                rows="20"
                onChange={(event) => {
                  setBlogContentInput(event.target.value);
                }}
                value={blogContentInput}
                placeholder="Tell us your story!"
              ></textarea>

              <button type="submit">Post your story!</button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div class="footer wrapper">
          <h5>Copyright 2021 K9PAWS</h5>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;


import "../styles/App.scss";
import { useState, useEffect } from "react";
import firebase from '../config/firebase'



function App() {


  
  const [nameInput, setNameInput] = useState("");
  
  const [titleInput, setTitleInput] = useState("");

  const [categoryInput, setCategoryInput] = useState("");

  const [blogContentInput, setBlogContentInput] = useState("");
  
  const [displayPost, setDisplayPost] = useState(false);

  const [blogPosts, setBlogPosts] = useState([]);




  useEffect(() => {

    const blogRef = firebase.database().ref();

    blogRef.on('value', (response) => {
      const blogPostInfo = response.val()

      console.log(blogPostInfo);

      const allBlogPosts = []

      for (let key in blogPostInfo) {
        allBlogPosts.push({
          key: key,
          name: blogPostInfo[key]
        })
      }

      console.log(allBlogPosts);

      setBlogPosts(allBlogPosts);


    })


  }, [])


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
      content: blogContentInput
    })

    setNameInput("");
    setTitleInput("");
    setCategoryInput("");
    setBlogContentInput("");

  };



  return (
    <div className="App">
      <header>
        <h1>K9PAWS</h1>
      </header>

      <section className="blogPostDisplay">
        <h2>Recent BLOG Posts</h2>

        {/* {displayPost ? <div>{nameInput}{titleInput}{blogContentInput}</div> : null} */}
        <div className="blogPostContainer">
          <ul>
            {blogPosts.map((post) => {
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
      {/* <form action="#" method="#" id="contact-form" class="contact-form" name="contact-form">

                            <span>
                                <label for="name" class="sr-only">Enter Your Name</label>
                                <input type="text" id="contact-form-user-name" name="name" placeholder="Name">
                                <label for="user-email" class="sr-only">Enter E-mail Address</label>
                                <input type="text" id="contact-form-user-email" name="user-email"
                                    placeholder="E-mail Address">
                            </span>

                            <label for="comment" class="sr-only">Enter Your Comments</label>
                            <textarea name="comment" id="contact-form-user-comment" cols="20" rows="8"
                                placeholder="Comment" maxlength="255"></textarea>

                            <div class="form-error-summary-msg hidden" id="contact-form-error-summary">Form not valid!
                            </div>

                            <input type="submit" value="Submit">
                        </form> */}
    </div>
  );
}

export default App;

  import { useState, useEffect } from "react";
  import firebase from "../config/firebase";

  const FormPage = () => {

  const [nameInput, setNameInput] = useState("");

  const [titleInput, setTitleInput] = useState("");

  const [categoryInput, setCategoryInput] = useState("General Knowledge");

  const [blogContentInput, setBlogContentInput] = useState("");

  const [blogPosts, setBlogPosts] = useState([]);


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

      // HandleSubmit for the form
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Firebase Code
        const blogRef = firebase.database().ref();
    
        const blogPostInfo = blogRef;
    
        blogPostInfo.push({
          name: nameInput,
          title: titleInput,
          category: categoryInput,
          content: blogContentInput,
          urlLink: `post${blogPosts.length + 1}`,
        });
    
        setNameInput("");
        setTitleInput("");
        setCategoryInput("");
        setBlogContentInput("");
      };
    
      return (
    
    <section className="blogPostComment">
      <div className="wrapper">
        <div className="blogForm">
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
              required
            ></input>
    
            <label htmlFor="blogPostTitle"></label>
            <input
              type="text"
              onChange={(event) => {
                setTitleInput(event.target.value);
              }}
              value={titleInput}
              placeholder="BLOG Post Title"
              required
            ></input>
    
            <label htmlFor="blogPostCategory" className="srOnly"></label>
            <select
              name="blogPostCategory"
              onChange={(event) => {
                setCategoryInput(event.target.value);
              }}
              value={categoryInput}
              className="postFormDropDown"
            >
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
              required
            ></textarea>
    
            <button type="submit">Post your story!</button>
          </form>
        </div>
      </div>
    </section>
    )
      
  }

  export default FormPage;
  
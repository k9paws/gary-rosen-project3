import "../styles/App.scss";
import NavBar from "./Navbar";
import MainPage from "./MainPage";
import BlogPosts from "./BlogPosts";
import FormPage from "./FormPage";
import BlogPost from "./BlogPost";
import Footer from "./Footer";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" render={() => <NavBar />} />
      <Route exact path="/blog" render={() => <BlogPosts />} />
      <Route exact path="/blog/:postNum" render={() => <BlogPost />} />
      <Route exact path="/" render={() => <MainPage />} />
      <Route exact path="/form" render={() => <FormPage />} />
      <Route path="/" render={() => <Footer />} />
    </div>
  );
}

export default App;

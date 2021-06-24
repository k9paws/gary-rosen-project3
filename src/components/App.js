import "../styles/App.scss";
import MainPage from "./MainPage";
import { Route } from "react-router-dom";
import BlogPosts from "./BlogPosts";
import NavBar from "./Navbar";
import BlogPost from "./BlogPost";
import Footer from "./Footer";
import FormPage from "./FormPage";

function App() {
  return (
    <div className="App">
      <Route path="/" render={() => <NavBar />} />
      <Route exact path="/blog" render={() => <BlogPosts />} />
      <Route exact path="/blog/:postNum" render={() => <BlogPost />} />
      <Route exact path="/" render={() => <MainPage />} />
      <Route path="/" render={() => <Footer />} />
      <Route exact path="/form" render={() => <FormPage />} />
    </div>
  );
}

export default App;

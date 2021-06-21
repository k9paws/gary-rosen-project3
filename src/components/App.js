
import "../styles/App.scss";
import MainPage from './MainPage';
import { Route } from "react-router-dom";
import BlogPosts from './BlogPosts';
import NavBar from './Navbar';
import BlogPost from './BlogPost';




function App() {


  return (
    <div className="App">
      <Route path="/" render={() => <NavBar />} />
      <Route exact path="/blog" render={() => <BlogPosts />} />
      <Route exact path="/blog/:postNum" render={() => <BlogPost />} />
      <Route exact path="/" render={() => <MainPage />} />
    </div>
  );
}

export default App;

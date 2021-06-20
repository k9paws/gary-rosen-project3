
import "../styles/App.scss";
import MainPage from './MainPage';
import { Route , Link } from "react-router-dom";
import BlogPosts from './BlogPosts';
import NavBar from './Navbar';



function App() {


  return (
    <div className="App">
      <Route path="/" render={() => <NavBar />} />
      <Route exact path="/blog" render={() => <BlogPosts />} />
      <Route exact path="/" render={() => <MainPage />} />




    </div>
  );
}

export default App;

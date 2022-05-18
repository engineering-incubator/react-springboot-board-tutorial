import React from "react";
import SignUp from "./signUp/SignUp";
import { Route, Switch } from "react-router-dom";
import LogIn from "./logIn/logIn";
import Navigation from "./components/navigation";
import ArticleList from "./articles/articleList";
import ArticlePost from "./articles/articlePost";
import Home from "./Home/home";
import ArticleEdit from "./articles/articleEdit";
import ArticleWrite from "./articles/articleWrite";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/articles/:articleId/change" component={ArticleEdit} />
        <Route path="/articles/:articleId" component={ArticlePost} />
        <Route path="/articles" component={ArticleList} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/article-write" component={ArticleWrite} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

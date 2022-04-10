import React from "react";
import SignUp from "./signUp/SignUp";
import { Route, Switch } from "react-router-dom";
import LogIn from "./logIn/logIn";
import Navigation from "./components/navigation";
import ArticleList from "./articles/articleList";
import ArticlePost from "./articles/articlePost";
import ArticleWrite from "./articles/articleWrite";
import Home from "./Home/home";
import ArticleEdit from "./articles/articleEdit";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/articles/:articleId/edit" component={ArticleEdit} />
        <Route path="/articles/:articleId" component={ArticlePost} />
        <Route path="/articles" component={ArticleList} />
        <Route path="/article-write" component={ArticleWrite} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
      </Switch>
    </div>
  );
}

export default App;

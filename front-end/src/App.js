import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticleEdit from "./articles/articleEdit";
import ArticleList from "./articles/articleList";
import ArticlePost from "./articles/articlePost";
import ArticleWrite from "./articles/articleWrite";
import Navigation from "./components/navigation";
import Home from "./Home/home";
import LogIn from "./logIn/logIn";
import SignUp from "./signUp/SignUp";

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

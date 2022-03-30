import React from "react";
import SignUp from "./signUp/SignUp";
import { Route, Switch } from "react-router-dom";
import LogIn from "./logIn/logIn";
import Navigation from "./components/navigation";
import ArticleList from "./articles/articleList";
import Article from "./articles/article";
import ArticlePost from "./articles/articlePost";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/article" exact={true} component={ArticleList} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/article/post" exact={true} component={ArticlePost} />
        <Route path="/article/:articleId" component={Article} />
      </Switch>
    </div>
  );
}

export default App;

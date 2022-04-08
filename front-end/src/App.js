import React from "react";
import SignUp from "./signUp/SignUp";
import { Route, Switch } from "react-router-dom";
import LogIn from "./logIn/logIn";
import Navigation from "./components/navigation";
import ArticleList from "./articles/articleList";
import ArticlePost from "./articles/articlePost";
import ArticleCreate from "./articles/articleCreate";
import Home from "./Home/home";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/articles/:articleId" component={ArticlePost} />
        <Route path="/articles" component={ArticleList} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/create" component={ArticleCreate} />
      </Switch>
    </div>
  );
}

export default App;

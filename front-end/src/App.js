import React from "react";
import SignUp from "./signUp/SignUp";
import { Route, Switch } from "react-router-dom";
import LogIn from "./logIn/logIn";
import Navigation from "./components/navigation";
import ArticleList from "./articles/articleList";
import Home from "./home/home";
import ArticleWrite from "./articles/articleWrite";
import Footer from "./components/footer";
import { PrivateRoute } from "./context/provideRoute";
import ArticlePost from "./articles/articlePost";
import { ProvideAuth } from "./context/ProvideAuth";

function App() {
  return (
    <ProvideAuth>
      <Navigation />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route exact path="/" component={Home} />
        <PrivateRoute
          exact
          path="/articles/:articleId"
          component={ArticlePost}
        />
        <PrivateRoute
          exact
          path="/articles/:articleId/edit"
          component={ArticleEditMock}
        />
        <Route path="/articles" component={ArticleList} />
        <Route path="/article-write" component={ArticleWrite} />
      </Switch>
      <Footer />
    </ProvideAuth>
  );
}

export default App;

const ArticleEditMock = () => <div>hello</div>;

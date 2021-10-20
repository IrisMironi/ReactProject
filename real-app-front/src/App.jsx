import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import SignIn from "./components/signin";
import usersService from "./services/usersService";
import Logout from "./components/logout";
import SignupBiz from "./components/signupBiz";
import CreateCard from "./components/createCard";
import ProtectedRoute from "./components/common/protectedRoute";
import MyCards from "./components/myCards";
import EditCard from "./components/editCard";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setState({
      user: usersService.getCurrentUser(),
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main className="container flex-fill">
          <Switch>
            <ProtectedRoute
              path="/my-cards"
              component={MyCards}
              biz={true}
              exact
            />
            <ProtectedRoute
              path="/my-cards/edit/:id"
              component={EditCard}
              biz={true}
              exact
            />
            <ProtectedRoute
              path="/create-card"
              component={CreateCard}
              biz={true}
              exact
            />
            <Route path="/signup-biz" component={SignupBiz} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/signin" component={SignIn} exact />
            <Route path="/logout" component={Logout} exact />
            <Route path="/about" component={About} exact />
            <Route path="/" component={Home} exact />
            {/* <Route path="/pageNotFound" exact>
              <PageHeader title="404 - Page Not Found." />
            </Route>
            <Redirect to="/pageNotFound" /> */}
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;

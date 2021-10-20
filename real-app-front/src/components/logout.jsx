import  { Component } from "react";
import usersService from "../services/usersService";

class Logout extends Component {
  state = {};

  componentDidMount() {
    usersService.logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;

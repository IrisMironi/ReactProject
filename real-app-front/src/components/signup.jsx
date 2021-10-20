import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import { createUser } from "../services/usersService";
import { toast } from "react-toastify";
import usersService from "../services/usersService";
import { Redirect } from "react-router-dom";

class Signup extends Form {
  state = {
    form: {
      email: "",
      password: "",
      name: "",
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      })
      .label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  async doSubmit() {
    const { form } = this.state;
    const body = { ...form, biz: false };

    try {
      await createUser(body);

      toast.info("A new account is open 💪🏾😎", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      this.props.history.replace("/signin");
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { email: response.data } });
      }
    }
  }

  render() {
    if (usersService.getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <PageHeader title="Signup for Real App" />
        <div className="row">
          <div className="col-12">
            <p>Have a new account it's free!!</p>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off" noValidate>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          <div className="mt-2">{this.renderButton("Sign Up")}</div>
        </form>
      </>
    );
  }
}

export default Signup;

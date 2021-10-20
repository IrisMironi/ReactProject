import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import { createUser } from "../services/usersService";
import usersService from "../services/usersService";
import { Redirect } from "react-router-dom";

class SignupBiz extends Form {
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
    const body = { ...form, biz: true };

    try {
      await createUser(body);

      await usersService.login(body.email, body.password);
      
      window.location = '/create-card'
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
        <PageHeader title="Signup as Business Owner into Real App" />
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

export default SignupBiz;

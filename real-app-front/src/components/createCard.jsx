import Form from "./common/form";
import Joi from "joi";
import PageHeader from "./common/pageHeader";
import cardsService from "../services/cardsService";
import { toast } from "react-toastify";

class CreateCard extends Form {
  state = {
    form: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
  };

  schema = {
    bizName: Joi.string().min(2).max(255).required().label("Name"),
    bizDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Description"),
    bizAddress: Joi.string().min(2).max(400).required().label("Address"),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    bizImage: Joi.string().min(11).max(1024).uri().label("Image").allow(""),
  };

  async doSubmit() {
    const {
      form: { bizImage, ...body },
    } = this.state;

    if (bizImage) {
      body.bizImage = bizImage;
    }

    try {
      await cardsService.createCard(body);
      toast("A new card is opened");
      this.props.history.push("/my-cards");
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { bizImage: response.data } });
      }
    }
  }

  render() {
    return (
      <>
        <PageHeader title="Create a New Card Real App" />
        <div className="row">
          <div className="col-12">
            <p>Create a New Biz Card</p>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="false" noValidate>
          {this.renderInput("bizName", "Name", "text", true)}
          {this.renderInput("bizDescription", "Description", "text", true)}
          {this.renderInput("bizAddress", "Address", "text", true)}
          {this.renderInput("bizPhone", "Phone", "text", true)}
          {this.renderInput("bizImage", "Image")}
          <div className="mt-2">{this.renderButton("Create Card")}</div>
        </form>
      </>
    );
  }
}

export default CreateCard;

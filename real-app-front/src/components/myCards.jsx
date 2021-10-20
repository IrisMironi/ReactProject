import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import cardsService from "../services/cardsService";
import Card from "./card";
import PageHeader from "./common/pageHeader";

class MyCards extends Component {
  state = { cards: [] };

  async componentDidMount() {
    this.getCards();
  }

  async getCards() {
    const { data } = await cardsService.getMyCards();
    if (data.length) {
      this.setState({
        cards: data,
      });
    }
  }
  handleCardDelete = async (id) => {
    await cardsService.deleteCard(id);
    toast("Card deleted");

    const { cards } = this.state;

    this.setState({
      cards: cards.filter((card) => card._id !== id),
    });
  };
  render() {
    const { cards } = this.state;

    return (
      <>
        <PageHeader title="My Cards Page" />
        <div className="row">
          <div className="col-12">
            <p>Your cards are listed below...</p>
          </div>
        </div>
        <div className="row">
          <Link to="/create-card">Create a new Card</Link>
        </div>
        <div className="row">
          {cards.length ? (
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onDelete={() => this.handleCardDelete(card._id)}
              />
            ))
          ) : (
            <h5>No cards yet...</h5>
          )}
        </div>
      </>
    );
  }
}

export default MyCards;

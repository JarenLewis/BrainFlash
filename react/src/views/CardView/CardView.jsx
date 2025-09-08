import './CardView.css';

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CardView() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/deck/${id}`).then(
      (response) => {
        console.log('hi')

        setCards(response.data.cards)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cards: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading-message">Loading Cards...</p>;
  }

  if (cards.length === 0) {
    return (
      <p className="empty-message">No cards found. {' '}
        <Link to="/decks/createdeck" className="create-link">
          Create
        </Link>{' '}
        a deck to get started!</p>
    );
  }
  return (
    <div className="card-list">
      {cards.map((card) => (
        <div className="card-id" key={card.id}>
          <h2 className="card-question">{card.front}</h2>
          <p className="card-answer">{card.back}</p>
          <button className="view-button">View Cards</button>
        </div>
      ))}
    </div>
  );
}
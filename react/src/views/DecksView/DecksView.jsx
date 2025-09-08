import './DecksView.css';

import axios from 'axios';
import StudySession from '../../components/StudySession/StudySession';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function DecksView() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/deck')
      .then((response) => {
        setDecks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching decks: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading-message">Loading decks...</p>;
  }

  if (decks.length === 0) {
    return (
      <p className="empty-message">No decks found.{' '}
        <Link to="/decks/createdeck" className="create-link">
          Create
        </Link>{' '}
        one to get started!</p>
    );
  }

  return (
    <>
      <Link to="/decks/createdeck">
        <button className="create-new-deck-button">
          <FontAwesomeIcon icon={faPlus} /> Create New Deck
        </button>
      </Link>
      <div className="deck-list">
        {decks.map((deck) => (
          <div className="deck-card" key={deck.deckId}>
            <h2 className="deck-title">{deck.title}</h2><br />
            <p className="deck-description">{deck.description}</p><br />
            <Link to={`/decks/${deck.deckId}`}>
              <button className="view-button">
                <FontAwesomeIcon icon={faMagnifyingGlass} /> View Cards
              </button>
            </Link>

            <Link to={`/decks/${deck.deckId}/study`}>
              <button className="start-study-session">
                <FontAwesomeIcon icon={faPlay} /> Start Study Session
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
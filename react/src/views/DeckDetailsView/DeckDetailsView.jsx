import "./DeckDetailsView.css";

import axios from "axios";
import DeckEditForm from "../../components/DeckEditForm/DeckEditForm";
import CardSearch from "../../components/CardSearch/CardSearch";
import CardCard from "../../components/CardCard/CardCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faWrench } from "@fortawesome/free-solid-svg-icons";

export default function DeckDetailsView() {
  const { id } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const scrollYRef = useRef(0);
  const deckContainerRef = useRef(null);
  const [restoreScroll, setRestoreScroll] = useState(false);
  const navigate = useNavigate();
  

  function loadDeck() {
    setLoading(true);
    axios
      .get("/cards")
      .then((response) => {
        const allCards = response.data;
        axios
          .get(`/deck/${id}`)
          .then((deckResponse) => {
            const deckData = deckResponse.data;
            setDeck(deckData);
            setCards(deckData.cards);

            const unusedCards = allCards.filter(
              (card) =>
                deckData.cards.every((other) => card.cardId !== other.cardId)
            );
            setSuggestions(unusedCards);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching deck:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
        setLoading(false);
      });
  }

  function removeCardFromDeck(card) {
    const dto = { deck_id: id, card_id: card.cardId };
  
    if (confirm(`Do you want to remove the "${card.front}" card from this deck?`)) {
      scrollYRef.current = window.scrollY;
      setRestoreScroll(true);  // signal scroll restoration upcoming
  
      axios
        .put("/edit-deck/remove", dto)
        .then(() => loadDeck())
        .catch((error) =>
          console.error("Error removing card from deck:", error)
        );
    }
  }

  function deleteDeck(deck) {

    if(confirm(`Do you want to remove "${deck.title}"?`)) {
      
      axios
        .delete(`/delete-deck/${deck.deckId}`)
        .then(() => {
          alert("Deck successfully deleted.");
          navigate("/decks");
        })
        .catch((error) => {
          console.error("Error removing deck:", error);
          alert("Failed to delete deck.");
    });
    }
  }
  
  useEffect(() => {
    if (restoreScroll) {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollYRef.current);
        setRestoreScroll(false);  // done restoring
      });
    }
  }, [cards, restoreScroll]);

useLayoutEffect(() => {
  if (scrollYRef.current !== 0) {
    console.log("Attempting to restore scroll to:", scrollYRef.current);

    const restoreScroll = () => {
      window.scrollTo(0, scrollYRef.current);
      console.log("Scroll restored to:", scrollYRef.current);
      // Uncomment this if you want to reset only after scroll happens reliably:
      // scrollYRef.current = 0;
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(restoreScroll);
    } else {
      setTimeout(restoreScroll, 50);
    }
  }
}, [cards.length]);


  useEffect(() => {
    loadDeck();
  }, []);

  useLayoutEffect(() => {
    if (scrollYRef.current !== 0) {
      console.log("Attempting to restore scroll to:", scrollYRef.current);
  
      const restoreScroll = () => {
        window.scrollTo(0, scrollYRef.current);
        console.log("Scroll restored to:", scrollYRef.current);
        // Uncomment this if you want to reset only after scroll happens reliably:
        // scrollYRef.current = 0;
      };
  
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(restoreScroll);
      } else {
        setTimeout(restoreScroll, 50);
      }
    }
  }, [cards.length]);
  

  if (loading) {
    return <p className="loading-message">Loading Cards...</p>;
  }

  if (cards.length === 0) {
    return (
      <p className="empty-message">
        No cards found.{" "}
        <Link to={`/create-card/${id}`} className="create-link">
          Create
        </Link>{" "}
        a card to get started!
      </p>
    );
  }

  return (
    <>
      <div className="deck-header">
        <div className="deck-info">
          <h1 className="deck-title-top">{deck.title}</h1>
          <h2 className="deck-description-top">{deck.description}</h2>

          <div className="deck-edit-controls">
            <DeckEditForm deck={deck} />
          </div>

          <div className="deck-actions">
            <Link to={`/create-card/${deck.deckId}`}>
              <button className="add-card-button">
                <FontAwesomeIcon icon={faWrench} /> Create Card to Add to Deck
              </button>
            </Link>
          </div>
        </div>
      </div>

      <button className="delete-deck-button" onClick={() => deleteDeck(deck)}>
        <FontAwesomeIcon icon = {faTrashCan} /> Delete Deck
      </button>

      <div className="card-list">
        {cards.map((card) => (
          <CardCard card={card} key={card.cardId}>
            <Link to={`/card/${card.cardId}`}>
              <button className="edit-button">
                <FontAwesomeIcon icon={faWrench} /> Edit Card
              </button>
            </Link>
           
            <button
              className="remove-button"
              onClick={() => removeCardFromDeck(card)}
            >
              <FontAwesomeIcon icon={faTrashCan} /> Remove from Deck
            </button>
          </CardCard>
        ))}
      </div>

      <CardSearch allCards={suggestions} deck_id={id} loadDeck={loadDeck} />
    </>
  );
}
import axios from "axios";
import styles from './DeckEditForm.module.css';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";

export default function DeckEditForm({ deck }) {
  const [deckDto, setDeckDto] = useState({
    title: deck?.title ?? "",
    description: deck?.description ?? ""
  });

  function setDeckDtoProperty(property, value) {
    setDeckDto({...deckDto, [property]: value});
  }

  function updateDeck(evt) {
    evt.preventDefault();
    console.log(deckDto);
    axios.put(`/edit-deck/${deck.deckId}`, deckDto)
    .then(
      response => {
        // navigate(`/decks/${deck.deckId}`);
        window.location.reload();
      }
    ).catch(
      error => {
        console.log("Error while editing deck: " + error);
      }
    );
  }

  return (
    <form className={styles.form} onSubmit={updateDeck}>
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="title">Edit Title</label>
          <input 
            id="title"
            type="text" 
            className={`${styles.searchInput} ${styles.titleInput}`}
            placeholder="Enter deck title..."
            value={deckDto.title}
            onChange={e => setDeckDtoProperty("title", e.target.value)}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="description">Edit Description</label>
          <input 
            id="description"
            type="text" 
            className={`${styles.searchInput} ${styles.descriptionInput}`}
            placeholder="Enter deck description..."
            value={deckDto.description}
            onChange={e => setDeckDtoProperty("description", e.target.value)}
          />
        </div>
      </div>
      
      <button className={styles.updateButton} type="submit">
        <FontAwesomeIcon icon={faGears} /> Update Deck
      </button>
    </form>
  )
}
import axios from "axios";
import TagSelect from "../TagSelect/TagSelect";
import CardCard from "../CardCard/CardCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function CardSearch({ allCards, deck_id, loadDeck }) {
    const [query, setQuery] = useState('');
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState(allCards);

    function addCardToDeck(card) {
        const dto = {
            deck_id: deck_id,
            card_id: card.cardId
        };
        console.log(dto);
        axios.put("/edit-deck/add", dto)
            .then(response => {
                loadDeck();
            }).catch(error => {
                console.error("Error adding card to deck: ", error);
            });
    }

    function isCardValid(card, tags, query) {
        const uppercaseQuery = query.toUpperCase();
        return tags.every(
            tag => card.tags.some(
                cardTag => cardTag.tagId === tag.tagId
            ))
            && (
                card.front.toUpperCase().includes(uppercaseQuery) ||
                card.back.toUpperCase().includes(uppercaseQuery)
            );
    }

    function updateQuery(e) {
        const query = e.target.value;
        // console.log("query");
        // console.log(query);
        setQuery(query);
        updateSuggestions(tags, query);
    }

    function updateTags(tags) {
        // console.log("tags");
        // console.log(tags);
        setTags(tags);
        updateSuggestions(tags, query);
    }

    function updateSuggestions(tags, query) {
        setSuggestions(allCards.filter(card => isCardValid(card, tags, query)));
    }

    return (
        <>
            <div className="search-container" style={{
                position: 'relative',
                marginBottom: '20px',
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto 20px auto'
            }}>
                <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '18px',
                        zIndex: 1
                    }}
                />
                <input
                    type="text"
                    onChange={updateQuery}
                    placeholder="Search cards by name or content..."
                    value={query}
                    style={{
                        width: '100%',
                        padding: '15px 20px 15px 50px',
                        fontSize: '16px',
                        border: '2px solid #ddd',
                        borderRadius: '25px',
                        outline: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#fff'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#007bff';
                        e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.2)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#ddd';
                        e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                />
            </div>

            <TagSelect setter={updateTags} initialTags={[]} />

            <div className="card-list">
                {suggestions.map((card) => (
                    <CardCard key={card.cardId} card={card}>
                        <Link to={`/card/${card.cardId}`}>
                            <button className="view-button">
                                <FontAwesomeIcon icon={faWrench} /> Edit Card
                            </button>
                        </Link> <br />
                        <br />
                        <button className="add-button" onClick={() => addCardToDeck(card)}>
                            <FontAwesomeIcon icon={faPlus} /> Add to Deck
                        </button>
                    </CardCard>
                ))}
            </div>
        </>
    )
}
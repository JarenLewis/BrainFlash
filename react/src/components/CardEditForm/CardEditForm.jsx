import axios from "axios";
import styles from "./CardEditForm.module.css";
import TagSelect from "../TagSelect/TagSelect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../ImageUpload/ImageUpload";

export default function CardEditForm({ card }) {
    const [newCard, setNewCard] = useState({
        cardId: card.cardId,
        userId: card.userId,
        front: card?.front ?? "",
        back: card?.back ?? "",
        tags: card?.tags ?? [],
        visual: card?.visual ?? false
    });
    const defaultTextFront = (card?.visual ?? false) ? "" : card.front
    const defaultImageFront = card?.visual ? card.front : "";
    const [textFront, setTextFront] = useState(defaultTextFront);
    const [imageFront, setImageFront] = useState(defaultImageFront);
    const navigate = useNavigate();

    function setNewCardProperty(property, value) {
        console.log(newCard);
        setNewCard({ ...newCard, [property]: value });
    }

    function updateCard(evt) {
        evt.preventDefault();
        axios
            .put(`/edit-card/${card.cardId}`, newCard)
            // .then(() => window.location.reload())
            .then(() => navigate("/"))
            .catch(error =>
                console.log("Error while editing card: " + error)
            );
    }

    function setTags(newTags) {
        setNewCardProperty("tags", newTags);
    }

    function handleVisualChange(e) {
        console.log(newCard);
        const isImage = e.target.checked;
        console.log(`checked: ${isImage}`);
        const newNewCard = { ...newCard, visual: isImage };
        if (isImage) {
            newNewCard.front = textFront;
        } else {
            newNewCard.front = imageFront;
        }
        setNewCard(newNewCard);
    }

    function handleTextFront(e) {
        const front = e.target.value;
        setNewCardProperty("front", front);
        setTextFront(front);
    }

    function handleImageFront(imageUrl) {
        setNewCardProperty("front", imageUrl);
        setImageFront(imageUrl);
    }


    return (
        <form className={styles.formContainer} onSubmit={updateCard}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Is this an image card?</label>

                <div className={styles.toggleWrapper}>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            className={styles.input}
                            defaultChecked={newCard.visual}
                            onChange={handleVisualChange}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

            </div>

            {
                newCard.visual ?
                    (
                        <ImageUpload setter={handleImageFront} defaultUrl={imageFront} />
                    )
                    :
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Edit Front of Card:</label>
                        <input
                            type="text"
                            className={styles.input}
                            defaultValue={textFront}
                            onChange={handleTextFront}
                        />
                    </div>
            }
            <div className={styles.formGroup}>
                <label className={styles.label}>Edit Back of Card:</label>
                <input
                    type="text"
                    className={styles.input}
                    defaultValue={newCard.back}
                    onChange={e => setNewCardProperty("back", e.target.value)}
                />
            </div>
            <TagSelect setter={setTags} initialTags={card.tags} />
            <button type="submit" className={styles.submitBtn}>
                Update Card
            </button>
        </form>
    );
};
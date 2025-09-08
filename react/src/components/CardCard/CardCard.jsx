import styles from './CardCard.module.css';

export default function CardCard({card, children}) {
    return (
        <div className="card-id" key={card.cardId}>
            {card.visual ? (
                <img className={styles.image} src = {card.front}/>
            ): 
            <h2 className="card-question">{card.front}
            </h2>}
            <p className="card-answer">{card.back}</p>
            <p className={styles.cardTags}>
                {card.tags.map(tag => "#" + tag.name).join(", ") || "(no tags)"}
            </p>
            {children}
        </div>
    )
}
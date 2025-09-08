import './StudySession.css'

import axios, { all } from 'axios';
import DecksView from '../../views/DecksView/DecksView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faL } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function StudySession() {
  const { deckId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const shuffle = searchParams.get("shuffle");
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [answerResults, setAnswerResults] = useState([]);
  const [sessionEnded, setSessionEnded] = useState(false)

  useEffect(() => {
    axios.get(`/deck/${deckId}`).then(
      (response) => {
        let cards = response.data.cards;
        if (shuffle) {
          for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor((i+1) * Math.random());
            [cards[i], cards[j]] = [cards[j], cards[i]];
          }
        }
        setCards(cards);
        setAnswerResults(Array(cards.length).fill(null));

      })
      .catch(error => console.error('Failed to load deck:', error));
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(
      () => {

        setShowBack(prev => !prev);
        setIsFlipping(false);
      },
      300
    );
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % cards.length);
    setShowBack(false);
  }

  const handleLast = () => {
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
    setShowBack(false);
  }

  const handleMarkCorrect = () => {
    const updatedResults = [...answerResults];
    updatedResults[currentIndex] = true;
    setAnswerResults(updatedResults);
    handleNext();
  };

  const handleMarkWrong = () => {
    const updatedResults = [...answerResults];
    updatedResults[currentIndex] = false;
    setAnswerResults(updatedResults);
    handleNext();
  };

  const handleSessionEnded = () => {
    setSessionEnded(true);
  };

  // if (cards.length === 0) return <p>There are no cards in this deck. Create some to study!</p>

  if (cards.length === 0) {
    return (
      <p className="empty-message">No cards found. {' '}
        <Link to="/decks/createdeck" className="create-link">
          Create
        </Link>{' '}
        a deck to get started!</p>
    );
  }



  const card = cards[currentIndex];
  const correctAnswers = answerResults.filter(result => result === true).length;
  const allAnswered = answerResults.every(result => result !== null);

  return (
    <div>
      {!allAnswered && !sessionEnded && (
        <div className='study-session-container'>
          <button className='end-session-button'
            onClick={handleSessionEnded}> End Session </button>
          <div>
            {answerResults.map(
              (answer, id) => (
                <FontAwesomeIcon key={id} icon={
                  answer === null ? faCircle :
                    answer ? faCircleCheck : faCircleXmark
                } className={
                  answer === null ? "empty-icon" :
                    answer ? "check-icon-light" : "xmark-icon-light"
                }
                />
              )
            )}
          </div><br/>
          <div className='flashcard-nav-container'>
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="last-button"
              onClick={handleLast}
            />

            <div className="flashcard" onClick={handleFlip}>
              <p className={`flashcard-text ${isFlipping ? 'flip-out' : 'flip-in'}`}>
                {showBack ? card.back : (card.visual ? (
                <img src = {card.front} className="flashcard-image" alt="Flashcard-front"/>
            ): 
             card.front
            )}
              </p>
            </div>

            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="next-button"
              onClick={handleNext}
            />
          </div>

          <div className={'answer-buttons ' + (answerResults[currentIndex] !== null ? 'invisible' : '')}>
            <button
              className='right-answer'
              onClick={handleMarkCorrect}
              disabled={answerResults[currentIndex] !== null}
            >
              Mastered <FontAwesomeIcon icon={faCircleCheck} className='check-icon' />
            </button>

            <button
              className='wrong-answer'
              onClick={handleMarkWrong}
              disabled={answerResults[currentIndex] !== null}
            >
              Still Needs Work <FontAwesomeIcon icon={faCircleXmark} className='xmark-icon' />
            </button>
          </div>

          <p className='card-counter'>Card {currentIndex + 1} of {cards.length}</p>
        </div>
      )}

      {allAnswered && !sessionEnded && (
        <div className='score-display'>
          <p>You got {correctAnswers} out of {cards.length} correct!</p>
          <Link to = {`/decks`}>
           <button className="go-back-to-decks"> Go Back to Your Decks </button>
          </Link>{' '}
        
           
        </div>
      )}

      {sessionEnded && !allAnswered && (
        <div className='ended-early'>
          <p>You ended the study session early.</p>
          <p>You got {correctAnswers} out of {cards.length} correct.</p>
          <Link to = {`/decks`}>
           <button className="go-back-to-decks"> Go Back to Your Decks </button>
          </Link>{' '}
        </div>
      )}
    </div>
  );
};
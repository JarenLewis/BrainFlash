import './CardCreateView.css';

import axios from 'axios';
import TagSelect from '../../components/TagSelect/TagSelect';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';

export default function CardCreateForm() {
    const { deckId } = useParams();
    const navigate = useNavigate();

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tags, setTags] = useState([]);
    const [myWidget, setMyWidget] = useState();
    const [isImageCard, setIsImageCard] = useState(false);
    const [imageUrl, setImageUrl] = useState('');


    useEffect(
        () => {
            initWidget();
        }, []
    )

    function initWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'do7vnljsr',
                uploadPreset: 'fhdqhxr3'
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    const image = result.info.url;
                    setFront(image);
                    setImageUrl(image);
                }
            }
        );

        setMyWidget(widget);
    }

    function upload() {
        myWidget.open();
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!front.trim() || !back.trim()) {
            alert('Please fill in a question and an answer.');
            return;
        }

        if (!back.trim()) {
            alert("Please provide an answer for the back of the card.");
            return;
        }

        if (!isImageCard && !front.trim()) {
            alert("Please provide text for the front of the card.");
            return;
        }

        if (isImageCard && !imageUrl) {
            alert("Please upload an image for the front of the card.");
            return;
        }

        setIsSubmitting(true);

        const newCard = {
            front: front.trim(),
            back: back.trim(),
            userId: 0,
            deckId: deckId,
            tags: tags,
            visual: isImageCard
        };

        try {
            const response = await axios.post('/create-card', newCard);
            console.log('Card created:', response.data);
            setFront('');
            setBack('');
            const cardDeckDto = {
                deck_id: deckId,
                card_id: response.data.cardId
            };
            const response2 = await axios.put('/edit-deck/add', cardDeckDto);
            navigate(`/decks/${deckId}`);

        } catch (error) {
            console.error('Cannot create card', error);

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="create-new-card">Create New Card</h1>

                {/* Card Type Selector */}
                <div className='card-type-toggle'>


                    <label className='toggle-switch'>
                        <input
                            type="checkbox"
                            checked={!isImageCard}
                            onChange={() => {
                                setIsImageCard(!isImageCard);
                                setFront('');
                                setImageUrl(null);

                            }}
                        />
                        <span className='slider'></span>

                    </label>

                    <div className='toggle-label'>
                        {isImageCard ? 'Visual Card' : 'Text Card'}
                    </div>
                </div>

                {!isImageCard ?

                    (
                        <>

                            <div className="question">
                                <label htmlFor="question" className="field-label">Question</label>
                                <input
                                    id="question"
                                    type="text"
                                    value={front}
                                    onChange={(e) => setFront(e.target.value)}
                                    placeholder="Enter card question"
                                    required
                                />
                            </div>
                        </>
                    )

                    :

                    (

                        <>

                            <div className="image-upload">
                                <button type="button"
                                    className="upload-image-button"
                                    onClick={upload}>
                                    Upload Image for the Front of Your Card
                                </button>
                            </div>


                            {imageUrl && (

                                <>
                                    <div className="image-preview-wrapper">
                                        <img src={imageUrl} alt="Card-Front-Preview" className='image-preview' />

                                        {/* id="image-question"
                                type='image'
                                value={imageUrl}
                                onChange={(e) => setFront(e.target.value)}
                                placeholder='Upload Card Image'
                                required */}

                                    </div>



                                </>
                            )}

                        </>

                    )}


                <div className="answer">
                    <label htmlFor="answer" className="field-label">Back of card</label>
                    <textarea
                        id="answer"
                        value={back}
                        onChange={(e) => setBack(e.target.value)}
                        placeholder="Enter card answer"
                        required
                    />
                </div>

                <TagSelect setter={setTags} initialTags={[]}>

                </TagSelect>

                {/* <div className = "tags">
<label htmlFor='tags' className = "field-label">Tags</label>
<input 
id="tags"
value={tags}
onChange={(e) => setTags(e.target.value)}
    required
    />
</div> */}
                <button
                    className="submit-button"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating...' : 'Create Card'}
                </button>



            </form>
        </>
    )
}
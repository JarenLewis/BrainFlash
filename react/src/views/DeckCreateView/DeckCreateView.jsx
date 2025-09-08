import './DeckCreateView.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://localhost:9000'
});

export default function DeckCreateForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const loadTags = async () => {
    //         try {
    //             const response = await api.get('/tags'); 
    //             console.log('Tags loaded:', response.data);
    //             setAvailableTags(response.data);
    //         } catch (error) {
    //             console.error('Error loading tags:', error);
    //         }
    //     };

    //     loadTags();
    // }, []);

    // const handleTagToggle = (tagToToggle) => {
    //     setSelectedTags(prev => 
    //         prev.includes(tagToToggle) 
    //             ? prev.filter(tag => tag !== tagToToggle)
    //             : [...prev, tagToToggle]
    //     );
    //     console.log(selectedTags);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            alert('Please fill in both title and description');
            return;
        }

        setIsSubmitting(true);

        const newDeck = {
            title: title.trim(),
            description: description.trim(),
            // tagIds: selectedTags
        };

        console.log(newDeck);

        try {
            const response = await api.post('/create-deck', newDeck);
            const deck = response.data;
            console.log('Deck created:', deck);
            // setTitle('');
            // setDescription('');
            // setSelectedTags([]);
            navigate(`/decks/${deck.deckId}`);

        } catch (error) {
            console.error('Cannot create deck', error);

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            
            <h1 className="create-new-deck">Create New Deck</h1>

            <div className="title-section">
                <label htmlFor="title" className="field-label">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter deck title"
                    required
                />
            </div>

            <div className="description-section">
                <label htmlFor="description" className="field-label">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter deck description"
                    required
                />
            </div>

            {/* Tags Section
            <div className="tags-section">
                <label className="field-label">Tags</label>
                <div className="tag-grid">
                    {availableTags.map((tag) => (
                        <label key={tag.tagId} className="tag-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagToggle(tag)}
                            />
                            <span className="tag-name">{tag.name}</span>
                        </label>
                    ))}
                </div>
                {availableTags.length === 0 && (
                    <p style={{color: 'white', marginTop: '0.5rem'}}>No tags available</p>
                )}
            </div> */}

            <button
                className="submit-button"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Creating...' : 'Create Deck'}
            </button>
        </form>
    );
}
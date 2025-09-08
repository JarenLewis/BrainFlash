import "./TagSelect.css";

import axios from "axios";
import { useState, useEffect } from "react";

export default function TagSelect({ setter, initialTags }) {
    const [selectedTags, setSelectedTags] = useState(initialTags || []);
    const [availableTags, setAvailableTags] = useState([]);

    function loadTags() {
        axios.get('/tags')
            .then(response => {
                setAvailableTags(response.data);
            })
            .catch(error => {
                console.log(`Error getting tags: ${error}`);
            });
    }

    const handleTagToggle = (tagToToggle) => {
        const newTags = selectedTags.some(tag => tag.tagId === tagToToggle.tagId)
            ? selectedTags.filter(tag => tag.tagId !== tagToToggle.tagId)
            : [...selectedTags, tagToToggle];

        setSelectedTags(newTags);
        setter(newTags);
    };

    useEffect(() => {
        loadTags();
    }, []);

    return (
        <div className="tags-section">
            {/* <label className="field-label">Tags</label> */}
            <div className="tag-grid">
                {availableTags.map((tag) => {
                    const isSelected = selectedTags.some(t => t.tagId === tag.tagId);
                    return (
                        <button
                            key={tag.tagId}
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className={`tag-btn ${isSelected ? "selected" : "#004aad"}`}
                            style={{
                                backgroundColor: isSelected ? tag.color : "#e8be79",
                                color: isSelected ? "#004aad" : "#333",
                                borderColor: tag.color
                            }}
                        >
                            #{tag.name}
                        </button>
                    );
                })}
            </div>
            {availableTags.length === 0 && (
                <p style={{ color: "white", marginTop: "0.5rem" }}>No tags available</p>
            )}
        </div>
    );
}
export default TagService;


const TagService = {
    async getAllTags() {
        try {
            const response = await fetch('/tags');
            if (!response.ok) {
                throw new Error('Failed to fetch tags');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading tags:', error);
            throw error;
        }
    },

    async getTagByName(name) {
        try {
            const response = await fetch(`/tag/name/${encodeURIComponent(name)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tag');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading tag:', error);
            throw error;
        }
    }
};


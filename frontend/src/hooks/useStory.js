import React, { useState } from 'react'
import { postStory } from '../services/storyService';

const useStory = () => {
    const [story, setStory] = useState(null)

    async function addStory() {
        console.log("Adding story:", story)
        const newStory = new FormData()
        newStory.append("story", story)

        console.log(newStory)
        try {
            const result = await postStory(newStory);
        } catch (error) {
            console.log("Error posting story:", error);
        }
    }
    
    return {
        addStory,
        story,
        setStory,
    };
}

export default useStory

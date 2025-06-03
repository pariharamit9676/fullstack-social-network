import API from "../axios";

export const postStory = async (storyData) => {
    console.log("Posting story:", storyData);
    const res = await API.post("/stories", storyData ,{ headers: {
                    "Content-Type": "multipart/form-data"
                }});
    return res.data;
};


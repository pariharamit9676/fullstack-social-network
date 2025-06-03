import React, { useState, useEffect } from "react";
import StoryModal from "./StoryModal";
import UploadStoryModal from "./UploadStoryModal";
import useStory from "../../hooks/useStory";

const storyList = [
  { img: "./images/profile-8.jpg", name: "Your Story", isUserStory: true },
  { img: "./images/profile-9.jpg", name: "Lila James" },
  { img: "./images/profile-10.jpg", name: "Winnie Haley" },
  { img: "./images/profile-11.jpg", name: "Daniel Bale" },
  { img: "./images/profile-12.jpg", name: "Jane Doe" },
  { img: "./images/profile-13.jpg", name: "Tina White" },
];

const STORY_DURATION = 5000; // 5 seconds

const Story = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const { addStory, story, setStory } = useStory();


  useEffect(() => {
    let timer;
    if (showStoryModal && activeStoryIndex !== null) {
      timer = setTimeout(() => {
        nextStory();
      }, STORY_DURATION);
    }
    return () => clearTimeout(timer);
  }, [activeStoryIndex, showStoryModal]);

  const openStoryModal = (index) => {
    setActiveStoryIndex(index);
    setShowStoryModal(true);
    setProgressKey((prev) => prev + 1);
  };

  const closeStoryModal = () => {
    setShowStoryModal(false);
    setActiveStoryIndex(null);
  };

  const nextStory = () => {
    if (activeStoryIndex < storyList.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      closeStoryModal();
    }
    setProgressKey((prev) => prev + 1);
  };

  const prevStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgressKey((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className="flex gap-4 overflow-x-auto p-4 sm:gap-6 sm:p-6 scrollbar-hide">
        {storyList.map((story, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[64px] sm:min-w-[90px] relative"
          >
            <div
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
              onClick={() => openStoryModal(index)}
            >
              <img
                src={story.img}
                alt={story.name}
                className="w-full h-full object-cover"
              />
            </div>
            {story.isUserStory && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="absolute bottom-4 right-7 mb-1 mr-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                <i className="uil uil-plus"></i>
              </button>
            )}
            <p className="text-xs sm:text-sm mt-2 text-center whitespace-nowrap">
              {story.name}
            </p>
          </div>
        ))}
      </div>

      {showStoryModal && (
        <StoryModal
          storyList={storyList}
          activeStoryIndex={activeStoryIndex}
          progressKey={progressKey}
          prevStory={prevStory}
          nextStory={nextStory}
          closeStoryModal={closeStoryModal}
          duration={STORY_DURATION}
        />
      )}

      {showUploadModal && (
        <UploadStoryModal
          story={story}
          setStory={setStory}
          addStory={addStory}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
};

export default Story;

import React from 'react';

const StoryModal = ({
  storyList,
  activeStoryIndex,
  progressKey,
  prevStory,
  nextStory,
  closeStoryModal,
  duration
}) => {
  const story = storyList[activeStoryIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full h-full sm:w-[400px] sm:h-[700px] bg-black rounded-lg overflow-hidden shadow-xl">

        {/* Close Button */}
        <button
          onClick={closeStoryModal}
          className="absolute top-4 right-4 z-20 text-white text-2xl"
        >
          &times;
        </button>

        {/* Image */}
        <img
          src={story.img}
          alt={story.name}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full p-4 z-10">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
            <div
              key={progressKey}
              className="h-full bg-white rounded-full"
              style={{
                animation: `progressAnim ${duration}ms linear forwards`,
              }}
            ></div>
          </div>

          {/* Profile Info */}
          <div className="mt-3 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
              <img
                src={story.img}
                alt={story.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white font-semibold">{story.name}</p>
          </div>
        </div>

        {/* Tap Areas for Navigation */}
        <div className="absolute top-0 left-0 h-full w-1/2 z-10" onClick={prevStory}></div>
        <div className="absolute top-0 right-0 h-full w-1/2 z-10" onClick={nextStory}></div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes progressAnim {
            from { width: 0% }
            to { width: 100% }
          }
        `}
      </style>
    </div>
  );
};

export default StoryModal;

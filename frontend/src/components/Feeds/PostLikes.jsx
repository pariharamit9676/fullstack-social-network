const PostLikes = () => (
    <div className="flex items-center mt-3">
      <div className="flex">
        <img src="./images/profile-10.jpg" className="w-6 h-6 rounded-full border-2 border-white" />
        <img src="./images/profile-4.jpg" className="w-6 h-6 rounded-full border-2 border-white -ml-2" />
        <img src="./images/profile-15.jpg" className="w-6 h-6 rounded-full border-2 border-white -ml-2" />
      </div>
      <p className="ml-3 text-sm text-gray-600">
        Liked by <b>Ernest Achiever</b> and <b>2,323 others</b>
      </p>
    </div>
  );
  
  export default PostLikes;
  
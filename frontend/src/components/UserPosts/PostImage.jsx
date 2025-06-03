const PostImage = ({ img, onClick }) => (
    <div
      onClick={onClick}
      className="relative w-full h-60 sm:h-64 md:h-72 overflow-hidden group cursor-pointer"
    >
      <img
        src={`/uploads/${img}`}
        alt="Post"
        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
      />
    </div>
  );
  
  export default PostImage;
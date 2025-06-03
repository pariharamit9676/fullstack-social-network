const PostImage = ({ img, onDoubleClick }) => (
    <div
      onDoubleClick={onDoubleClick}
      className="w-full bg-black flex items-center justify-center h-64 sm:h-full"
    >
      <img
        src={`/uploads/${img}`}
        alt="Post"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
  
  export default PostImage;
  
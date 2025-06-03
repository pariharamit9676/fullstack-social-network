const PostImage = ({ img }) => (
    <div className="mt-4">
      <img src={`/uploads/${img}`} alt="Post" className="w-full h-64 object-contain rounded-md bg-black" />
    </div>
  );
  
  export default PostImage;
  
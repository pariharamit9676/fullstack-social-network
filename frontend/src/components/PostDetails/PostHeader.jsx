const PostHeader = ({ profilePic, name, onClose }) => (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-2">
        <img src={`/uploads/${profilePic}`} alt="User" className="w-8 h-8 rounded-full" />
        <h3 className="font-medium">{name}</h3>
      </div>
      <button onClick={onClose} className="text-gray-600 hover:text-black">✖</button>
    </div>
  );
  
  export default PostHeader;
  
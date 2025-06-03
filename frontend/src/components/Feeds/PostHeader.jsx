import moment from "moment";

const PostHeader = ({ name, profilePic, createdAt }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <img src={`/uploads/${profilePic}`} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
      <div className="ml-3">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <small className="text-gray-500 text-sm">{moment(createdAt).fromNow()}</small>
      </div>
    </div>
    <button className="text-gray-500 hover:text-gray-700">
      <i className="uil uil-ellipsis-h"></i>
    </button>
  </div>
);

export default PostHeader;

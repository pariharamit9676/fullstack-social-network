import moment from "moment";

const renderMessage = (notif) => {
  switch (notif.type) {
    case "follow":
      return `${notif.name} started following you`;
    case "like":
      return `${notif.name} liked your post`;
    case "comment":
      return `${notif.name} commented on your post`;
    default:
      return `${notif.name} sent a notification`;
  }
};

const NotificationDropdown = ({ notifications, onClickNotif }) => {
  return (
    <div className="absolute left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-3 z-50">
      {notifications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 text-sm">
          No new notifications
        </p>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => onClickNotif(notif.senderId)}
          >
            <img
              src={`/uploads/${notif.profilePic}`}
              alt="profile"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                <span
                  className={`${
                    notif.isRead
                      ? ""
                      : "font-semibold text-black dark:text-white"
                  }`}
                >
                  {notif.name}
                </span>{" "}
                {renderMessage(notif).replace(`${notif.name} `, "")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {moment(notif.createdAt).fromNow()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;

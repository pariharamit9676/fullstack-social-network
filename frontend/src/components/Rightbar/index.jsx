import React from "react";

const users = [
    {
      id: 1,
      name: "john_doe",
      profilePic: "profile-1.jpg",
      isOnline: true,
      lastActive: "Online now",
    },
    {
      id: 2,
      name: "jane_smith",
      profilePic: "profile-2.jpg",
      isOnline: false,
      lastActive: "2 hours ago",
    },
    {
      id: 3,
      name: "cool_user123",
      profilePic: "profile-3.jpg",
      isOnline: true,
      lastActive: "Online now",
    },
    {
      id: 4,
      name: "sunny_guy",
      profilePic: "profile-4.jpg",
      isOnline: false,
      lastActive: "Yesterday",
    },
    {
      id: 5,
      name: "techie_amy",
      profilePic: "profile-5.jpg",
      isOnline: true,
      lastActive: "Online now",
    },
    {
      id: 6,
      name: "vibes_only",
      profilePic: "profile-6.jpg",
      isOnline: false,
      lastActive: "4 hours ago",
    },
    {
      id: 7,
      name: "mystery_girl",
      profilePic: "profile-7.jpg",
      isOnline: true,
      lastActive: "Online now",
    },
    {
      id: 8,
      name: "chill_boy",
      profilePic: "profile-8.jpg",
      isOnline: false,
      lastActive: "3 days ago",
    },
    {
      id: 9,
      name: "coder_max",
      profilePic: "profile-9.jpg",
      isOnline: true,
      lastActive: "Online now",
    },
    {
      id: 10,
      name: "wanderlust_sam",
      profilePic: "profile-10.jpg",
      isOnline: false,
      lastActive: "5 mins ago",
    },
  ];
  

const Rightbar = () => {
  return (
    <div className="w-full lg:w-72 bg-white p-4 rounded-xl shadow-sm sticky top-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">People You May Know</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="relative">
              <img
                src={`/images/${user.profilePic}`}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              {user.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <span className="text-xs text-gray-500">{user.lastActive}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightbar;

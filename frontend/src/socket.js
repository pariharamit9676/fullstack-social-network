import {io} from "socket.io-client";

const socket = io("http://localhost:3000", {withCredentials: true,
    transports: ["websocket"],
},
    
);


export const onOnlineUsersUpdate = (callback) => {
    socket.on('updateOnlineUsers', (users) => {
        callback(users);
    });
};

export const disconnectSocket = () => {
        socket.disconnect();
};

export default socket;
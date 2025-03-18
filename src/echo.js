import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echoInstance = new Echo({
    broadcaster: "pusher",
    key:  "e12c6c8f7a4bb7ff201a",
    cluster:  "mt1", // ✅ Ensure cluster is included
    forceTLS: true,
    encrypted: true,
    authEndpoint: "http://127.0.0.1:8000/broadcasting/auth", // ✅ Fix authentication
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure token is included
            Accept: "application/json",
        },
    },
    enabledTransports: ["ws", "wss"], // ✅ Ensure WebSockets are used
});

export default echoInstance;

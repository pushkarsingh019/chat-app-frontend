import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Components/Chat";

function App(){

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setshowChat] = useState(false);

    let productionSocket = "https://chat-backend-production-cb67.up.railway.app";
    let developmentSocket = "http://localhost:8080/"

    const socket = io.connect(productionSocket, {transports : [`websocket`]});

    socket.on("error", (err) => {
        console.log("error on the client side " + err);
    })

    socket.on("connect", () => {
        console.log("client side connected");
    })


    function joinRoom(event){
        event.preventDefault();
        socket.emit("joinRoom", room);
        setshowChat(true);
    };


    return(
        <div className="App">
            {!showChat ? <form onSubmit={joinRoom}>
                    <h1>Join A room</h1>
                    <input type="text" placeholder="Username" required onChange={(event) => {setUsername(event.target.value)}} />
                    <input type="text" placeholder="Room Id"  required onChange={(event) => setRoom(event.target.value) }/>
                    <button type="Submit">Join Room</button>
             </form> : <Chat socket={socket} username={username} room={room} />}
        </div>
    )
};

export default App;
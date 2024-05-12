import React, { useEffect } from 'react'
import '../styles/pages/homePage.scss';
import BasicTable from "../components/PlayerTable/PlayerTable.jsx";
import { getAllUser } from "../services/userService.js";
import io from "socket.io-client";

function Home() {
    const [rows, setRows] = React.useState([]);
    const [statusPlayer, setStatusPlayer] = React.useState([]);
    const [loading, setLoading] = React.useState(true);


    const ENDPOINT = "ws://localhost:3000";

    useEffect(() => {
        const socket = io(ENDPOINT);

        socket.on("connect", () => {
            console.log("Connected to server WS ");
        });

        socket.on("bienvenue", data => {
            console.log("Data received:", data);
        });

        socket.on("multiplayer", status => {
            console.log("Data received:", status);
            status.length === 0 ?
                setStatusPlayer("undefined") :
                setStatusPlayer(status);
        });

        return () => {
            console.log("Disconnected from server WS");
            socket.disconnect()
        };
    }, []);

    useEffect(() => {
        getAllUser().then((data) => {
            for (const row of data) {
                row.status = "undefined"
                console.log("row : ", row);
            }
            setRows(data);


            setLoading(false);
            console.log("data : ", data);
            console.log("loading : ", loading);
        });
    }, []);

    return (
        <div id="div__homePage">
            <h1> HomePage</h1>
            {loading ?
                <h1>Loading...</h1> :
                <BasicTable rows={rows} status={statusPlayer}/>}
        </div>
    )
}

export default Home
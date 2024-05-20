import React, { useEffect, useState } from 'react';
import '../styles/pages/homePage.scss';
import BasicTable from "../components/PlayerTable/PlayerTable.jsx";
import { getAllUser } from "../services/userService.js";
import io from "socket.io-client";

function Home() {
    const [rows, setRows] = useState([]);
    const [statusPlayer, setStatusPlayer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadFlag, setReloadFlag] = useState(false); // État pour forcer le rechargement
    // const [connected, setConnected] = useState(false);

    const reload = () => {
        setLoading(true); // Afficher le message de chargement
        setReloadFlag(prevFlag => !prevFlag); // Change l'état pour forcer le rechargement
    }

    // const tryconnect = () => {
    //
    //     setConnected(true);
    // }

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
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        console.log("get all user");
        getAllUser().then((data) => {
            for (const row of data) {
                row.status = "undefined";
            }
            setRows(data);
            setLoading(false);
        });
    }, [reloadFlag]); // Ajoutez reloadFlag comme dépendance

    return (
        <div id="div__homePage">
            <h1> HomePage</h1>
            {loading ?
                <h1>Loading...</h1> :
                <BasicTable rows={rows} status={statusPlayer} reload={reload}/>}
        </div>
    );
}

export default Home;
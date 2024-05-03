import React, { useEffect, useState } from 'react'
import '../../styles/components/tableauPlayer.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { deleteUser, getAllUser } from "../../services/userService.js";
import io from "socket.io-client";

const ENDPOINT = "ws://localhost:3000";

function TablePlayers() {
    const [players, setPlayers] = useState([]);
    const [playerStatus, setPlayerStatus] = useState([]);

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
            setPlayerStatus(status);
        });

        return () => {
            console.log("Disconnected from server WS");
            socket.disconnect()
        };
    }, []);

    useEffect(() => {
        const fetchJoueurs = async () => {
            const PlayerData = await getAllUser();
            await setPlayers(PlayerData);
        };

        fetchJoueurs();
    }, []);

    const removePlayer = async (id) => {
        const rst = await deleteUser(id + "1000");
        await fetchJoueurs();
        console.log("The player has been successfully deleted with id :", id);
    }

    const fetchJoueurs = async () => {
        const PlayerData = await getAllUser();
        setPlayers(PlayerData);
    };

    return (
        <>
            {
                players.length === 0 ? <p>Chargement...</p> :
                    <table id="tableau-player">
                        <thead>
                        <tr>
                            <th>Image Profil</th>
                            <th>Pseudo</th>
                            <th>Money</th>
                            <th className="center">Status</th>
                            <th id="tr__deleteUser">Delete</th>
                            <th>More</th>
                        </tr>
                        </thead>
                        <tbody>
                        {players.map((player) => (
                            <tr key={player.discord_id}>
                                <td id="id_table">
                                    <img className="tableau-player__avatarImg"
                                         src={player.avatar} alt=""/>
                                </td>
                                <td>{player.pseudo}</td>
                                <td>{player.money}</td>
                                <td>
                                    {playerStatus.length !== 0 ? <>
                                            {playerStatus.includes(player.pseudo) ?
                                                <p className="tag online">Online</p> :
                                                <p className="tag offline">Offline</p>
                                            }
                                        </> :
                                        <p className="tag undefined">Loading
                                            ...</p>
                                    }
                                    {/*<p className="online">Online</p>*/}
                                </td>
                                <td>
                                    <div className="center">
                                        <button
                                            onClick={() => removePlayer(player.id)}
                                            style={{
                                                background: 'none',
                                                border: 'none'
                                            }}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <Link className="center"
                                          to={`/user/${player.discord_id}`}>
                                        voir plus
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            }
        </>
    );

}

export default TablePlayers
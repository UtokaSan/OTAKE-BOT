import React, { useEffect, useState } from 'react'
import '../../styles/components/tableauPlayer.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { deleteUser, getAllUser } from "../../services/userService.js";

function TablePlayers() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchJoueurs = async () => {
            const PlayerData = await getAllUser();
            await setPlayers(PlayerData);
            console.log("P", players)
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
                            <th>ID Discord</th>
                            <th>Pseudo</th>
                            <th>Argent</th>
                            <th className="center">Status</th>
                            <th id="tr__deleteUser">Supprimer</th>
                            <th>Plus</th>
                        </tr>
                        </thead>
                        <tbody>
                        {players.map((player) => (
                            <tr key={player.discord_id}>
                                <td id="id_table">
                                    <img className="tableau-player__avatarImg"
                                         src={player.avatar} alt=""/>
                                    <p>{player.discord_id}</p>
                                </td>
                                <td>{player.pseudo}</td>
                                <td>{player.money}</td>
                                <td>
                                    <p className="online">Online</p>
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
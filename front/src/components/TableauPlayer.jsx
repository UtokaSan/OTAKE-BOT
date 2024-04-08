import React, { useEffect } from 'react'
import imgTrash from '../assets/icons/trash-solid.svg';
import '../styles/components/tableauPlayer.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllUser } from "../services/userService.js";

function TableauPlayers({players}) {

    const deleteItem = (id) => {
        console.log("deleteItem", id);
        const deltePlayer = async () => {
            const PlayerData = await getAllUser();
            setPlayer(PlayerData);
        };
    }

    return (
        <table className="tableau-player">
            <thead>
            <tr>
                <th>ID</th>
                <th>UUID</th>
                <th>Pseudo</th>
                <th>Argent</th>
                <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
            {players.map((joueur) => (
                <tr key={joueur.id}>
                    <td>{joueur.id}</td>
                    <td>{joueur.uuid}</td>
                    <td>{joueur.pseudo}</td>
                    <td>{joueur.argent}</td>
                    <td className="center">
                        <button onClick={() => deleteItem(joueur.id) }
                                style={{background: 'none', border: 'none'}}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

}

export default TableauPlayers
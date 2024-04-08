import React, { useState, useEffect } from 'react';
import JoueursTableau from './TableauPlayer.jsx';
import { getAllUser } from '../services/userService.js';

function ContainerTableauPlayers() {
    const [player, setPlayer] = useState([]);

    useEffect(() => {
        const fetchJoueurs = async () => {
            const PlayerData = await getAllUser();
            setPlayer(PlayerData);
        };

        fetchJoueurs();
    }, []);

    return (
        <div>
            <h1>Liste des Player</h1>
            { player.length === 0 ? <p>Chargement...</p>: <JoueursTableau players={player} />}

        </div>
    );
}

export default ContainerTableauPlayers;
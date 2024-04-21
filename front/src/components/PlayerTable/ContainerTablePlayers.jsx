import React from 'react';
import JoueursTableau from './PlayerTable.jsx';

function ContainerTablePlayers() {
    return (
        <div>
            <h2>Liste des joueurs</h2>
            <JoueursTableau/>
        </div>
    );
}

export default ContainerTablePlayers;
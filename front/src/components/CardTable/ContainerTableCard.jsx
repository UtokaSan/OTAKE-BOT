import React, { useEffect, useState } from 'react';
import { getAllCard } from "../../services/cardService.js";
import CardsTable from "./CardsTable.jsx";
import { getAllUser } from "../../services/userService.js";

function ContainerTableCard() {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);


    const fetchDataCards = () => {
        const dataCard = getAllCard();
        const dataPlayer = getAllUser();

        Promise.all([dataPlayer, dataCard]).then((values) => {
            console.log("values : ", values);
            values[1].forEach(card => {
                const player = values[0].find(p => p.discord_id === card.owner_id);
                if (player) {
                    card.pseudo_owner = player.pseudo;
                }
            });
            setRows(values[1]);
        });

        setIsLoading(false);

        console.log("rows : ", rows);
        console.log("player : ", dataPlayer);
        console.log("loading : ", isLoading);
    }


    useEffect(() => {
        fetchDataCards();
    }, []);

    return (
        <div>
            <h2>Liste des cartes</h2>
            <br/>
            {
                isLoading ? <div>Chargement ...</div>
                    : <CardsTable rows={rows}/>
            }
        </div>
    );
}

export default ContainerTableCard;
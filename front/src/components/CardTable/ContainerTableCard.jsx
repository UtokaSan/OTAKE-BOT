import React, { useEffect, useState } from 'react';
import CardsTable from '../CardTable/CardsTable';
import Cookies from "js-cookie";
import axios from "axios";
import { getAllUser } from "../../services/userService.js";
import { getAllCard } from "../../services/cardService.js";

function ContainerTableCard() {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [admin, setAdmin] = useState("")

    const fetchDataCards = () => {
        const dataCard = getAllCard();
        const dataPlayer = getAllUser();
        const user = verifUser();

        Promise.all([dataPlayer, dataCard, user]).then((values) => {
            values[1]?.forEach(card => {
                const player = values[0].find(p => p.discord_id === card.owner_id);
                if (player) {
                    card.pseudo_owner = player.pseudo;
                }
            });
            setRows(values[1] || []);
        }).catch(error => {
            console.error('Failed to fetch data:', error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchDataCards();
    }, []);

    const verifUser = () => {
        const user = Cookies.get('jwt');
        if (user) {
            axios.post("http://localhost:3000/user/isconnect", {jwt: user}).then((response) => {
                const role = Number.parseInt(response.data.role);
                if (role === 1) {
                    setAdmin(true);
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            setAdmin(false);
        }
    }

    return (
        <div>
            <h2>Liste des cartes</h2>
            <br/>
            {
                isLoading ? <div>Chargement ...</div>
                    : <CardsTable rows={rows} isConnect={admin}/>
            }
        </div>
    );
}

export default ContainerTableCard;

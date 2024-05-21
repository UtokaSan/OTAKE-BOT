import React, { useEffect, useState } from 'react';
import { getAllCard } from "../../services/cardService.js";
import CardsTable from "./CardsTable.jsx";
import { getAllUser } from "../../services/userService.js";
import Cookies from "js-cookie";
import axios from "axios";

function ContainerTableCard() {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [admin, setAdmin] = useState("")

    const fetchDataCards = () => {
        const dataCard = getAllCard();
        const dataPlayer = getAllUser();
        const user = verifUser();

        Promise.all([dataPlayer, dataCard, user]).then((values) => {
            // console.log("values : ", values);
            values[1].forEach(card => {
                const player = values[0].find(p => p.discord_id === card.owner_id);
                if (player) {
                    card.pseudo_owner = player.pseudo;
                }
            });
            setRows(values[1]);
        });

        setIsLoading(false)
    }

    useEffect(() => {
        fetchDataCards();
    }, []);

    const verifUser = () => {
        const user = Cookies.get('jwt');
        console.log("jwt : " + user);
        if (user) {
            axios.post("http://localhost:3000/user/isconnect", {jwt: user}).then((response) => {
                const role = Number.parseInt(response.data.role);
                if (role === 1) {
                    console.log("connecté");
                    setAdmin(true);
                    return true;
                }
                console.log("Not Admin"); // Because, admin is returning on top.
            }).catch((error) => {
                console.log(error);
            })
        } else {
            console.log("pas de compte admin");
        }
        setAdmin(false)
        return false;
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
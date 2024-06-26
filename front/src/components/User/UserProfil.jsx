import React, { useEffect, useState } from 'react'
// import img from '../assets/img.png';
import '../../styles/components/userProfil.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import axios from "axios";
import { getAllCardWithOneUserId } from "../../services/cardService.js";
import CardsTable from "../CardTable/CardsTable.jsx";


function UserProfil({user, setToggleChange}) {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [admin, setAdmin] = useState();
    // console.log("user : ", user);


    const fetchDataCards = () => {
        console.log("user.discord_id : ", user.discord_id);

        // setTimeout(() => {
        const dataCard = getAllCardWithOneUserId(user.discord_id).then(cards => {
            cards.map(card => {
                card.pseudo_owner = user.pseudo;
            })

            verifUser().then(() => {
                setRows(cards);
            });

            setIsLoading(false);
        });

        // }, 2000);
    }

    useEffect(() => {
        // console.log("user PP: ", user.discord_id);
        fetchDataCards();
    }, []);

    const verifUser = async () => {
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
        <>
            <div id="div_usercomponents__firstrow">
                <div id="container__image">
                    <img id="container__imagePlayer" src={user.avatar}
                         alt="image of {Player}"/>
                </div>
                <div id="container_userinformation">
                    <h2>{user.pseudo}
                        <button className="button__editcard"
                                onClick={() => setToggleChange(change => !change)}
                                style={{
                                    background: 'none',
                                    border: 'none'
                                }}>
                            <FontAwesomeIcon
                                icon={faPenToSquare}/>
                        </button>
                    </h2>
                    <p>He has {user.money}💰</p>
                    <p>He has also played : {+user.win + +user.loose} games -
                        win
                        : {+user.win} and
                        loose
                        : {+user.loose}</p>
                </div>
            </div>

            <div id="div_usercomponents__secondrow">
                <h2 className="underline">You have These cards :</h2>
                {rows.length === 0 && admin ? "Loading ..."
                    :
                    <>
                        <CardsTable rows={rows} isConnect={admin}
                                    fetchDataCards={fetchDataCards}/>
                    </>
                }

            </div>
        </>
    )
}

export default UserProfil
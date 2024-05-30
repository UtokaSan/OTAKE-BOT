import React, { useEffect, useState } from 'react'
// import img from '../assets/img.png';
import '../../styles/components/userProfil.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { getAllCardWithOneUserId } from "../../services/cardService.js";
import { editUser } from "../../services/userService.js";
import Cookies from "js-cookie";
import axios from "axios";
import CardsTable from "../CardTable/CardsTable.jsx";

function UserProfil({user, setToggleChange}) {
    // const [isLoading, setIsLoading] = useState(true);

    const [rows, setRows] = useState([]);
    const [admin, setAdmin] = useState();

    const [userMoney, setUserMoney] = useState(user.money);
    const [userWin, setUserWin] = useState(user.win);
    const [userLoose, setUserLoose] = useState(user.loose);

    const ChangeMoneyValue = (event) => {
        setUserMoney(event.target.value);
    }
    const ChangeWinValue = (event) => {
        setUserWin(event.target.value);
    }
    const ChangeLooseValue = (event) => {
        setUserLoose(event.target.value);
    }

    const blurUpdateUser = () => {
        console.log("Blur");
        editUser(user.discord_id, {userMoney, userWin, userLoose}).then(rst => {
            console.log("rst : ", rst);
        }).catch(err => {
            console.log("error : ", err)
        });
    }

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
                    <p>He has
                        <input type="text" value={userMoney}
                               onChange={ChangeMoneyValue}
                               onBlur={blurUpdateUser}
                        />💰
                    </p>
                    <p>He has also played : {+user.win + +user.loose} games -
                        win
                        :
                        <input type="text" value={userWin}
                               onChange={ChangeWinValue}
                               onBlur={blurUpdateUser}
                        />
                        and
                        loose
                        :
                        <input type="text" value={userLoose}
                               onChange={ChangeLooseValue}
                               onBlur={blurUpdateUser}
                        />
                    </p>
                </div>
            </div>

            <div id="div_usercomponents__secondrow">
                <h2 className="underline">You have These cards :</h2>
                {rows.length === 0 && admin ? "Loading ..."
                    :
                    <>
                        <CardsTable rows={rows} isConnect={admin}/>
                    </>
                }

            </div>
        </>
    )
}

export default UserProfil
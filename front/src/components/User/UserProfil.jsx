import React from 'react'
// import img from '../assets/img.png';
import '../../styles/components/userProfil.scss'
import CardsTable from "../CardTable/cardsTable.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function UserProfil({user, setToggleChange, id}) {

    console.log(user);

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
                    <p>He has also played : {+user.win + +user.loose} games =>
                        win
                        : {+user.win} and
                        loose
                        : {+user.loose}</p>
                </div>
            </div>
            <div id="div_usercomponents__secondrow">
                <h2 className="underline">You have These cards :</h2>
                <CardsTable id={id}/>
            </div>
        </>
    )
}

export default UserProfil
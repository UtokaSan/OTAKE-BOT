import React from 'react'
// import img from '../assets/img.png';
import '../../styles/components/userProfil.scss'
import imgDefault from '../../assets/a2e6bdd801ec12639b5d48b84dbe6765.jpg'
import CardsTable from "../CardTable/cardsTable.jsx";

function UserProfil() {
    const money = 100
    const win = 10
    const loose = 20

    return (
        <>
            <div id="div_usercomponents__firstrow">
                <div id="container__image">
                    <img id="container__imagePlayer" src={imgDefault}
                         alt="image of {Player}"/>
                </div>
                <div id="container_userinformation">
                    <h2>Testtt</h2>
                    <p>He has {money}💰</p>
                    <p>He has also played : {win + loose} games => win
                        : {win} and
                        loose
                        : {loose}</p>
                </div>
            </div>
            <div id="div_usercomponents__secondrow">
                <h2 className="underline">You have These cards :</h2>
                <CardsTable/>
            </div>
        </>
    )
}

export default UserProfil
import React from 'react'
import '../styles/pages/cardsPage.scss';
import CardsTable from "../components/CardTable/cardsTable.jsx";

function CardPage() {
    console.log("Home")
    return (
        <div id="div__cardpage">
            <h1> CardPage</h1>
            <CardsTable/>
        </div>
    )
}

export default CardPage
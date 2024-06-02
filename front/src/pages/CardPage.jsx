import React from 'react'
import '../styles/pages/cardsPage.scss';
import ContainerTableCard from "../components/CardTable/ContainerTableCard.jsx";

function CardPage() {
    
    // console.log("Home")
    return (
        <div id="div__cardpage">
            <h1> CardPage</h1>
            <ContainerTableCard/>
        </div>
    )
}

export default CardPage
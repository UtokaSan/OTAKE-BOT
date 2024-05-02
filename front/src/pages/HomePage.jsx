import React from 'react'
import '../styles/pages/homePage.scss';
import ContainerTableauPlayer
    from "../components/PlayerTable/ContainerTablePlayers.jsx";

function Home() {
    return (
        <div id="div__homePage">
            <h1> HomePage</h1>
            <ContainerTableauPlayer/>
        </div>
    )
}

export default Home
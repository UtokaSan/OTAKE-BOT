import React from 'react'
// import img from '../assets/img.png';
import '../styles/pages/utilisateurPage.scss'
import UserProfil from "../components/User/UserProfil.jsx";

function UtilisateurPage() {
    const getUserData = () => {

    }

    return (
        <div id="utilisateurPage">
            <h1> HomePage</h1>
            <form action="">
                <UserProfil/>
            </form>

        </div>
    )
}

export default UtilisateurPage
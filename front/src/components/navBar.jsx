import React from 'react'
import { Link } from "react-router-dom";
// import img from '../assets/img.png';
import '../styles/components/navbar.scss';

function navBar() {
    return (
        <>
            <nav id="navBar">
                <a href="/" className="navbar__logo">DEDEDE</a>
                <menu id="navbar__menu">
                    <Link to="/users">Utilisateurs</Link>
                    <Link to="/cards">Cartes</Link>
                </menu>
            </nav>
        </>
    )
}

export default navBar
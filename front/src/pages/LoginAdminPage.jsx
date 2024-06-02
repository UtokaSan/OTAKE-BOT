import React from 'react'
// import img from '../assets/img.png';
import '../styles/pages/loginAdminPage.scss';
import axios from "axios";
import Cookies from "js-cookie";

// import useAccountStore from "../storage/accountStore.js";

function LoginAdminPage() {

    const login = (e) => {
        e.preventDefault();
        console.log("Submit")
        console.log(e.target.pseudo.value)
        console.log(e.target.password.value)
        axios.post('http://localhost:3000/user/login', {
            pseudo: e.target.pseudo.value,
            password: e.target.password.value
        }).then((response) => {
            Cookies.set('jwt', response.data.token, {expires: 7}); // Expire dans 7 jours
            console.log("success");
            window.location.href = "/"
        }).catch((error) => {
            console.log(error)
        })
    }

    // Cookies.set('user', {token: "zrdf"}, {expires: 7}); // Expire dans 7 joursZ
    const user = Cookies.get('jwt'); // Retourne 'John Doe'
    console.log(user);

    return (
        <div id="div__loginpage">
            <h1>Connection for Admin</h1>
            <form onSubmit={login}>
                <label htmlFor="pseudo">Email</label>
                <input type="text" id="pseudo" name="pseudo" required/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"
                       required/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default LoginAdminPage
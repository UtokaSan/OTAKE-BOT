import React, { useEffect, useState } from 'react'
// import img from '../assets/img.png';
import '../styles/pages/utilisateurPage.scss'
import UserProfil from "../components/User/UserProfil.jsx";
import { useParams } from "react-router-dom";
import UserProfilEdit from "../components/User/UserProfilEdit.jsx";
import { getOneUser } from "../services/userService.js";

function UtilisateurPage() {
    const {id} = useParams();
    const [toggleChange, setToggleChange] = useState(false)
    const [user, setUser] = useState();

    useEffect(() => {
        console.log("test");
        getUserData();
    }, [])


    const getUserData = async () => {
        const user = await getOneUser(id);
        console.log(user)
        await setUser(user)
    }

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    
    return (
        <div id="utilisateurPage">
            {/*<form action="">*/}
            {user ?
                <>
                    {toggleChange ?
                        <UserProfilEdit user={user}
                                        setToggleChange={setToggleChange}
                                        id={id}/> :
                        <UserProfil user={user}
                                    setToggleChange={setToggleChange} id={id}/>}
                </>
                :
                <p>Chargement</p>

            }


        </div>
    )
}

export default UtilisateurPage
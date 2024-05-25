import React, { useEffect, useState } from 'react'
// import img from '../assets/img.png';
import '../styles/pages/utilisateurPage.scss'
import { useParams } from "react-router-dom";
import { getOneUser } from "../services/userService.js";
import UserProfil from "../components/User/UserProfil.jsx";
import UserProfilEdit from "../components/User/UserProfilEdit.jsx";

function UtilisateurPage() {
    const {id} = useParams();
    const [toggleChange, setToggleChange] = useState(false)
    const [user, setUser] = useState();
    // const [isLoading, setIsLoading] = useState(true)

    const getUserData = async () => {
        const user = await getOneUser(id);
        await setUser(user)
    }

    useEffect(() => {
        getUserData();
    }, []);


    return (
        <div id="utilisateurPage">
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

            <p>test</p>

        </div>
    )
}

export default UtilisateurPage
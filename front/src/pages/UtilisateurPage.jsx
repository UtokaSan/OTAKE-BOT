import React, { useEffect, useState } from 'react'
// import img from '../assets/img.png';
import '../styles/pages/utilisateurPage.scss'
import { useParams } from "react-router-dom";
import { getOneUser } from "../services/userService.js";
import UserProfil from "../components/User/UserProfil.jsx";
import UserProfilEditv2 from "../components/User/UserProfilEditv2.jsx";

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
    }, [user]);


    return (
        <div id="utilisateurPage">
            {user ?
                <>
                    {toggleChange ?
                        // <>
                        //     <p>test</p>
                        // </>
                        // <UserProfilEdit user={user}
                        //                 setToggleChange={setToggleChange}
                        //     // reload={getUserData()}
                        <UserProfilEditv2 user={user}
                                          setToggleChange={setToggleChange}/>
                        :
                        <UserProfil user={user}
                                    setToggleChange={setToggleChange}/>}
                </>
                :
                <p>Chargement</p>
            }
        </div>
    )
}

export default UtilisateurPage
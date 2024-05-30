import React, { useState } from 'react'
// import img from '../assets/img.png';
import '../../styles/components/userProfil.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function UserProfil({user, setToggleChange}) { // reload
    const [rows, setRows] = useState([]);
    const [admin, setAdmin] = useState();
    const [userMoney, setUserMoney] = useState(user.money);
    const [userWin, setUserWin] = useState(user.win);
    const [userLoose, setUserLoose] = useState(user.loose);

    console.log(user)

    const ChangeMoneyValue = (event) => {
        setUserMoney(event.target.value);
    }

    const ChangeWinValue = (event) => {
        setUserWin(event.target.value);
    }

    const ChangeLooseValue = (event) => {
        setUserLoose(event.target.value);
    }

    const handleBlur = () => {
        console.log("Blur");
        editUser(user.discord_id, {userMoney, userWin, userLoose}).then(rst => {
            console.log("rst : ", rst);
        }).catch(err => {
            console.log("error : ", err)
        });
    }

    // const fetchDataCards = () => {
    //     console.log("user.discord_id : ", user.discord_id);
    //
    //     setTimeout(() => {
    //         const dataCard = getAllCardWithOneUserId(user.discord_id).then(cards => {
    //             console.log("cards : ", cards);
    //             cards.map(card => {
    //                 card.pseudo_owner = user.pseudo;
    //             })
    //             console.log("cards 2 : ", cards)
    //
    //             verifUser().then(() => {
    //                 setRows(cards);
    //             });
    //         });
    //
    //     }, 2000);
    // }
    //
    // const verifUser = async () => {
    //     const user = Cookies.get('jwt');
    //     if (user) {
    //         axios.post("http://localhost:3000/user/isconnect", {jwt: user}).then((response) => {
    //             const role = Number.parseInt(response.data.role);
    //             if (role === 1) {
    //                 setAdmin(true);
    //             }
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //     } else {
    //         setAdmin(false);
    //     }
    // }


    return (
        <>
            <div id="div_usercomponents__firstrow">
                <div id="container__image">
                    <img id="container__imagePlayer" src={user.avatar}
                         alt={`image of ${user.pseudo}`}/>
                </div>
                <div id="container_userinformation">
                    <h2>{user.pseudo}
                        <button className="button__editcard"
                                onClick={() => {
                                    setToggleChange(change => !change)
                                }}
                            // await reload;
                            // await console.log("reload")
                                style={{
                                    background: 'none',
                                    border: 'none'
                                }}>
                            <FontAwesomeIcon
                                icon={faPenToSquare}/>
                        </button>
                    </h2>
                    <p>He has <input type="text"
                                     onChange={ChangeMoneyValue}
                                     value={userMoney}
                                     onBlur={handleBlur} // to save when it loses focus
                                     size={userMoney.length}/>💰</p>
                    <p>He has also played : {+user.win + +user.loose} games
                        -
                        win
                        :
                        <input type="text"
                               onChange={ChangeWinValue}
                               value={userWin}
                               onBlur={handleBlur} // to save when it loses focus
                               size={userWin.length}/>
                        and
                        loose
                        : <input type="text"
                                 onChange={ChangeLooseValue}
                                 value={userLoose}
                            // onBlur={handleBlur} // to save when it loses focus
                                 size={userLoose.toString().length}/></p>
                </div>
            </div>
            <div id="div_usercomponents__secondrow">
                <h2 className="underline">You have These cards :</h2>
                {/*<CardsTable rows={rows} isConnect={admin}/>*/}
            </div>
        </>
    )
}

export default UserProfil
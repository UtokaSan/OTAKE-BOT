import React, { useEffect, useState } from 'react';
import '../../styles/components/cardstable.scss';
import RowCard from "./rowCard.jsx";
import RowCardEdit from "./rowCardEdit.jsx";
import {
    getAllCard,
    getAllCardWithOneUserId
} from "../../services/cardService.js";

function CardsTable({id}) {
    const [cards, setCards] = useState([]); // Renamed 'cardss' to 'cards'
    const [toggleChange, setToggleChange] = useState(-1);

    console.log("id : ", id)
    const fetchCards = async () => {
        let cardsData
        if (id !== undefined) cardsData = await getAllCardWithOneUserId(id);
        else cardsData = await getAllCard();
        console.log("cards : ", cardsData);
        setCards(cardsData);
    };

    useEffect(() => {
        console.log(toggleChange)
    }, [toggleChange]);

    useEffect(() => {
        fetchCards();
    }, []);


    return (
        <div id="div__container--table">
            {cards.length === 0 ? (
                <div>Chargement ...</div> // Changed "Loading..." to "Chargement ..." to match your language preference
            ) : (
                <>
                    {/*<input type="text"/>*/}
                    <table id="table__cards">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Card Name</th>
                            <th>Card Rarity</th>
                            <th>Attack</th>
                            <th>Life</th>
                            <th>Owner</th>
                            <th className="tr__deleteCard">Delete</th>
                            <th className="center">Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cards.map((card, index) => (
                            toggleChange !== index ?
                                <RowCard card={card} reload={fetchCards}
                                         setToggleChange={setToggleChange}
                                         index={index}
                                         key={index}/>
                                :
                                <RowCardEdit card={card} reload={fetchCards}
                                             setToggleChange={setToggleChange}
                                             index={index}
                                             key={index}
                                />

                        ))}
                        </tbody>
                    </table>
                </>

            )}
        </div>
    );
}

export default CardsTable;
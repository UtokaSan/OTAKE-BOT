import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteCard, getAllCard } from "../../services/cardService.js";
// import img from '../assets/img.png';
// import '../styles/style.css'

function RowCard({card, reload, setToggleChange, index}) {

    const removeItem = async (id) => {
        await deleteCard(id);

        const cardsData = await getAllCard();
        reload(cardsData);
        console.log(cards);
        setToggleChange(card, index)
    }
    // console.log(card)

    return (
        <tr key={card.id} className={card.rarity}>
            <td className="td_rowcard__id">
                <img className="tableau_card__image"
                     src={card.image}
                     alt={`Image of ${card.name}`}/>
                <p>{card.id}</p>
            </td>
            <td>
                {card.name}
            </td>
            <td>
                {card.rarity}
            </td>
            <td>
                {card.attack}
            </td>
            <td>
                {card.pv}
            </td>
            <td>
                {card.owner_id ? card.owner_id : "Not Obtain"}
            </td>
            <td>
                <button className="button__deletecard"
                        onClick={() => removeItem(card.id)}
                        style={{
                            background: 'none',
                            border: 'none'
                        }}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </td>
            <td>
                <button className="button__editcard"
                        onClick={() => setToggleChange(index)}
                        style={{
                            background: 'none',
                            border: 'none'
                        }}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}/>
                </button>
            </td>
        </tr>
    )
}

export default RowCard
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteCard, getAllCard } from "../../services/cardService.js";
// import img from '../assets/img.png';
// import '../styles/style.css'

function RowCard({card, reload, setToggleChange, index}) {
    const [cardName, setCardName] = useState(card.name);
    const [cardRarity, setCardRarity] = useState(card.rarity);
    const [cardAttack, setCardAttack] = useState(card.attack);
    const [cardLife, setCardLife] = useState(card.pv);

    const removeItem = async (id) => {
        const rst = await deleteCard(id);
        const cardsData = await getAllCard();
        reload(cardsData);
    }

    const ChangeNameValue = (event) => {
        setCardName(event.target.value);
    }

    const ChangeRarityValue = (event) => {
        setCardRarity(event.target.value);
    }

    const ChangeAttackValue = (event) => {
        setCardAttack(event.target.value);
    }

    const ChangeLifeValue = (event) => {
        setCardLife(event.target.value);
    }

    const onBlur = () => {

    }
    return (
        <tr key={card.id} className={card.rarity}>
            <td className="td_rowcard__id">
                <img className="tableau_card__image"
                     src={card.image}
                     alt={`Image of ${cardName}`}/>
                <p>{card.name}</p>
            </td>
            <td>
                <div>
                    <input type="text"
                           size={cardName.length || 1} // to not take all place
                           value={cardName} // value use state
                           onChange={ChangeNameValue} // require to input with React and useState
                           onBlur={handleBlur} // to save when it loses focus
                    />
                </div>
            </td>
            <td>
                <input type="text"
                       size={cardRarity.length || 1}
                       value={cardRarity}
                       onChange={ChangeRarityValue}
                />
            </td>
            <td>
                <input type="text"
                       size={cardAttack.toString().length || 1}
                       onChange={ChangeAttackValue}
                       value={cardAttack}/>
            </td>
            <td>
                <input type="text"
                       size={cardLife.toString().length || 1}
                       onChange={ChangeLifeValue}

                       value={cardLife}/>
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
                        onClick={() => setToggleChange(-1)}
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
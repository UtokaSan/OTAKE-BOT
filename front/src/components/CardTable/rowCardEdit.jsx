import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    deleteCard,
    editCard,
    getAllCard
} from "../../services/cardService.js";

function RowCard({card, reload, setToggleChange}) {
    const [cardName, setCardName] = useState(card.name);
    const [cardRarity, setCardRarity] = useState(card.rarity);
    const [cardAttack, setCardAttack] = useState(card.attack);
    const [cardLife, setCardLife] = useState(card.pv);
    const [cardOwner, setCardOwner] = useState(card.owner_id || 'null');

    const removeItem = async (id) => {
        await deleteCard(id);
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

    const ChangeOwnerIdValue = (event) => {
        setCardOwner(event.target.value);
    }

    const handleBlur = () => {
        editCard(card.id, cardName, cardRarity, cardAttack, cardLife, cardOwner).then(rst => {
            console.log("rst : ", rst);
            reload();
        }).catch(err => {
            console.log("error : ", err)
        });
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
                       onBlur={handleBlur} // to save when it loses focus

                />
            </td>
            <td>
                <input type="text"
                       size={cardAttack.toString().length || 1}
                       onChange={ChangeAttackValue}
                       value={cardAttack}
                       onBlur={handleBlur} // to save when it loses focus
                />

            </td>
            <td>
                <input type="text"
                       size={cardLife.toString().length || 1}
                       onChange={ChangeLifeValue}
                       onBlur={handleBlur} // to save when it loses focus
                       value={cardLife}/>
            </td>
            <td>
                <input type="text"
                       size={cardOwner.toString().length || 1}
                       onChange={ChangeOwnerIdValue}
                       onBlur={handleBlur} // to save when it loses focus
                       value={cardOwner}/>
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
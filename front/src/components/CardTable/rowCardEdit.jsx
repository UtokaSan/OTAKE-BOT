import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteCard, editCard } from "../../services/cardService.js";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function RowCard({card, index, setToggleChange, fetchDataCards}) {
    const [cardName, setCardName] = useState(card.name);
    const [cardRarity, setCardRarity] = useState(card.rarity);
    const [cardAttack, setCardAttack] = useState(card.attack);
    const [cardLife, setCardLife] = useState(card.pv);
    const [cardPrice, setCardPrice] = useState(card.price);
    const [cardOwner, setCardOwner] = useState(card.owner_id || 'null');

    const removeItem = async (id) => {
        await deleteCard(id);
        console.log("deleted");
        fetchDataCards();
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

    const ChangePriceValue = (event) => {
        setCardPrice(event.target.value);
    }

    const ChangeOwnerIdValue = (event) => {
        setCardOwner(event.target.value);
    }

    const handleBlur = () => {
        editCard(card.id, cardName, cardRarity, cardAttack, cardLife, cardPrice, cardOwner).then(rst => {
            console.log("rst : ", rst);
            fetchDataCards();
        }).catch(err => {
            console.log("error : ", err)
        });
    }
    return (
        <TableRow hover key={card.discord_id}>
            <TableCell
                component="th"
                className="table__cell__pseudo"
                id={`enhanced-table-checkbox-${index}`}
                scope="row"
            >
                <div
                    className="playerTable__div__container">
                    <img
                        src={card.image ? card.image : "https://cdn.whatemoji.org/wp-content/uploads/2020/07/Robot-Emoji.png"}
                        className={"image__avatar"}
                        alt={`Card picture of ${card.name}`}
                    />
                    <input type="text"
                           size={cardName.length || 1} // to not take all place
                           value={cardName} // value use state
                           onChange={ChangeNameValue} // require to input with React and useState
                           onBlur={handleBlur} // to save when it loses focus
                    />
                </div>
            </TableCell>
            <TableCell
                align="right">
                <input type="text"
                       size={cardAttack.toString().length || 1}
                       onChange={ChangeAttackValue}
                       value={cardAttack}
                       onBlur={handleBlur} // to save when it loses focus
                />
            </TableCell>
            <TableCell
                align="right">
                <input type="text"
                       size={cardLife.toString().length || 1}
                       onChange={ChangeLifeValue}
                       onBlur={handleBlur} // to save when it loses focus
                       value={cardLife}/>
            </TableCell>
            <TableCell
                align="right">
                <input type="text"
                       size={cardPrice.toString().length || 1}
                       onChange={ChangePriceValue}
                       onBlur={handleBlur} // to save when it loses focus
                       value={cardPrice}/>
            </TableCell>
            <TableCell
                align="right">
                <input type="text"
                       size={cardRarity.length || 1}
                       value={cardRarity}
                       onChange={ChangeRarityValue}
                       onBlur={handleBlur} // to save when it loses focus
                />
            </TableCell>
            <TableCell
                align="right">
                <input type="text"
                       size={cardOwner.toString().length || 1}
                       onChange={ChangeOwnerIdValue}
                       onBlur={handleBlur} // to save when it loses focus
                       value={cardOwner}/>
            </TableCell>
            <TableCell
                align="right">
                <button className="button__editcard"
                        onClick={() => setToggleChange(-1)}
                        style={{
                            background: 'none',
                            border: 'none'
                        }}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}/>
                </button>
            </TableCell>
            <TableCell
                align="right">
                <button className="button__deletecard"
                        onClick={() => removeItem(card.id)}
                        style={{
                            background: 'none',
                            border: 'none'
                        }}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </TableCell>

        </TableRow>
    )
}

export default RowCard
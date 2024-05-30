import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteCard } from "../../services/cardService.js";
// import img from '../assets/img.png';
// import '../styles/style.css'

function RowCard({index, cards, isConnect, setToggleChange, fetchDataCards}) {

    const removeItem = async (id) => {
        await deleteCard(id);
        console.log("deleted")
        fetchDataCards();
    }


    return (
        <TableRow hover>
            <TableCell
                component="th"
                className="table__cell__pseudo"
                id={`enhanced-table-checkbox-${index}`}
                scope="row"
            >
                <div
                    className="playerTable__div__container">
                    <img
                        src={cards.image ? cards.image : "https://cdn.whatemoji.org/wp-content/uploads/2020/07/Robot-Emoji.png"}
                        className={"image__avatar"}
                        alt={`Card picture of ${cards.name}`}
                    />
                    <p>{cards.name}</p>
                </div>
            </TableCell>
            <TableCell
                align="right">{cards.attack}</TableCell>
            <TableCell
                align="right">{cards.pv}</TableCell>
            <TableCell
                align="right">{cards.price}</TableCell>
            <TableCell align="center"
                       className="table-cell-rarity">
                <div
                    className={`tag__card tag__card${cards.rarity}`}>
                    {cards.rarity}
                </div>
            </TableCell>
            <TableCell align="right">
                {cards.pseudo_owner ? cards.pseudo_owner : "not owned"}
            </TableCell>
            {isConnect && (
                <>
                    <TableCell
                        align="right">
                        <button className="button__editcard"
                                onClick={() => {
                                    console.log("Change : ", index);
                                    setToggleChange(index)
                                }}
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
                                onClick={() => removeItem(cards.id)}
                                style={{
                                    background: 'none',
                                    border: 'none'
                                }}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </TableCell>
                </>
            )}
        </TableRow>
        // <tr key={card.id} className={card.rarity}>
        //     <td className="td_rowcard__id">
        //         <img className="tableau_card__image"
        //              src={card.image}
        //              alt={`Image of ${card.name}`}/>
        //         <p>{card.id}</p>
        //     </td>
        //     <td>
        //         {card.name}
        //     </td>
        //     <td>
        //         {card.rarity}
        //     </td>
        //     <td>
        //         {card.attack}
        //     </td>
        //     <td>
        //         {card.pv}
        //     </td>
        //     <td>
        //         {card.owner_id ? card.owner_id : "Not Obtain"}
        //     </td>
        //     <td>
        //         <button className="button__deletecard"
        //                 onClick={() => removeItem(card.id)}
        //                 style={{
        //                     background: 'none',
        //                     border: 'none'
        //                 }}>
        //             <FontAwesomeIcon icon={faTrash}/>
        //         </button>
        //     </td>
        //     <td>
        //         <button className="button__editcard"
        //                 style={{
        //                     background: 'none',
        //                     border: 'none'
        //                 }}>
        //             <FontAwesomeIcon
        //                 icon={faPenToSquare}/>
        //         </button>
        //     </td>
        // </tr>
    )
}

export default RowCard